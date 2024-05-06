<template>
  <div class="container-gauge position-relative d-flex flex-column">
    <div class="gaugeArea align-self-start"></div>
    <span class="h4 porcentage position-absolute"
      >{{ getAcumuladoChartValue }}%</span
    >
  </div>
</template>

<script>
import { gaugeChart } from 'gauge-chart'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      gaugeOptions: {
        hasNeedle: false,
        needleColor: 'gray',
        needleUpdateSpeed: 1000,
        arcColors: ['#27CE09', 'lightgray'],
        rangeLabel: ['0', '100'],
        arcDelimiters: [0],
      },
    }
  },
  computed: {
    ...mapState(['statistics']),
    getAcumuladoChartValue() {
      let acumulado = 0
      for (const hist of this.statistics.history) {
        acumulado += Number(this.efect(hist))
      }
      return acumulado.toFixed(2)
    },
  },
  methods: {
    ...mapMutations(['setAppError']),
    efect(hist) {
      let efectividad = (
        (hist.tracking.reduce((acc, el) => acc + el.managed.delivered, 0) *
          100) /
        hist.tracking.reduce((acc, el) => acc + el.info.assigned, 0)
      ).toFixed(2)

      return efectividad
    },
  },

  mounted() {
    try {
      this.gaugeOptions.arcDelimiters = [
        this.getAcumuladoChartValue == 0 ? 0.5 : this.getAcumuladoChartValue,
      ]

      // Drawing and updating the chart
      document.querySelector('.gaugeArea').innerHTML = ''
      gaugeChart(
        document.querySelector('.gaugeArea'),
        300,
        this.gaugeOptions
      ).updateNeedle(this.getAcumuladoChartValue)
    } catch (error) {
      let message = `Error al obtener datos para el grafico circular: ${error}`
      this.setAppError(message)
    }
  },
}
</script>
<style scoped>
.container-gauge {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gaugeArea {
  transform: scale(1.1);
}

.porcentage {
  margin-top: 50px;
  margin-left: 20px;
}
</style>

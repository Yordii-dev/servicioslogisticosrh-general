<template>
  <Line
    css-classes="container-line-chart position-relative"
    :styles="{
      width: '100%',
    }"
    height="150"
    chart-id="bar-chart"
    :dataset-id-key="datasetIdKey"
    :chart-options="chartOptions"
    :chart-data="{
      labels: getDays,
      datasets: getDataSets,
    }"
    :plugins="{}"
  />
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import { mapMutations, mapState } from 'vuex'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

export default {
  components: { Line },
  props: {
    datasetIdKey: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    }
  },

  computed: {
    ...mapState(['statistics']),

    getDays() {
      let date = new Date().toISOString().split('T')[0].split('-')
      let daysLength = new Date(date[0], date[1], 0).getDate()

      let days = []
      for (let i = 1; i <= daysLength; i++) {
        days.push(i)
      }

      return days
    },

    getDataSets() {
      return [
        {
          label: 'Efectividad / Dia',
          backgroundColor: '#f87979',
          data: this.getDaysData(),
        },
      ]
    },
  },

  methods: {
    ...mapMutations(['setAppError']),

    getDaysData() {
      let data = []
      for (const day of this.getDays) {
        data.push(this.getDayData(day))
      }
      return data
    },
    getDayData(dayNumber) {
      for (const hist of this.statistics.history) {
        let onlyDay = this.getOnlyDayFromHistDate(hist)
        if (onlyDay == dayNumber) {
          let efectividad = Number(this.efect(hist))
          return efectividad
        }
      }
      return null
    },
    getOnlyDayFromHistDate(hist) {
      let date = hist.date.split(' ')[0]
      let day = date.split('-')[2]
      return Number(day)
    },

    efect(hist) {
      let efectividad = (
        (hist.tracking.reduce((acc, el) => acc + el.managed.delivered, 0) *
          100) /
        hist.tracking.reduce((acc, el) => acc + el.info.assigned, 0)
      ).toFixed(2)

      return efectividad
    },
  },
}
</script>

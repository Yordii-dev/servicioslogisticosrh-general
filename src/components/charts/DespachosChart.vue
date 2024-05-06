<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    chart-id="bar-chart"
    :dataset-id-key="datasetIdKey"
    :plugins="{}"
    css-classes="container-bar-chart position-relative"
    :styles="{
      width: '100%',
    }"
    height="150"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { weekNumber } from '../../helpers/date'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  components: { Bar },
  props: {
    datasetIdKey: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      chartData: {
        labels: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miercoles',
          'Jueves',
          'Virnes',
          'Sabado',
        ],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
  mounted() {
    try {
      let numeroDeSemanaActual = weekNumber(new Date(2021, 11, 26))
      console.log('Numero de semana actual: ', numeroDeSemanaActual)
      this.chartData.datasets = [
        {
          label: 'Entregados',
          backgroundColor: '#28a745',
          data: [5, 10, 15, 20, 25, 30, 24],
        },
        {
          label: 'Parciales',
          backgroundColor: '#ffc107',
          data: [5, 10, 15, 20, 25, 30, 20],
        },
        {
          label: 'No Entregados',
          backgroundColor: '#dc3545',
          data: [5, 10, 15, 20, 25, 30, 20],
        },
      ]
    } catch (error) {
      let message = `Error de Front: Al montar el grafio de lineas: ${error}`
      this.setAppError(message)
    }
  },
}
</script>

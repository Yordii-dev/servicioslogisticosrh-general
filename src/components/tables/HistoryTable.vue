<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Fecha de carga</th>
        <th scope="col">Asignados</th>
        <th scope="col">Entregado</th>
        <th scope="col">Parcial</th>
        <th scope="col">N.Entregado</th>
        <th scope="col">Efect. %</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hist in statistics.history" :key="hist.date">
        <td>{{ hist.date }}</td>
        <td>
          {{ assigneds(hist) }}
        </td>
        <td>{{ delivereds(hist) }}</td>
        <td>{{ partials(hist) }}</td>
        <td>
          {{ notDelivereds(hist) }}
        </td>
        <td>{{ efect(hist) }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: { ...mapState(['statistics']) },
  methods: {
    assigneds(hist) {
      let assig = hist.tracking.reduce((acc, el) => acc + el.info.assigned, 0)
      return assig
    },
    delivereds(hist) {
      let part = hist.tracking.reduce(
        (acc, el) => acc + el.managed.delivered,
        0
      )
      return part
    },
    partials(hist) {
      let part = hist.tracking.reduce((acc, el) => acc + el.managed.partial, 0)
      return part
    },
    notDelivereds(hist) {
      let notD = hist.tracking.reduce(
        (acc, el) => acc + el.managed.notDelivered,
        0
      )
      return notD
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

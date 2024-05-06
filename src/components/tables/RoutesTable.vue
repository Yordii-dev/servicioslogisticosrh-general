<template>
  <table class="table">
    <thead class="thead-white">
      <tr>
        <th scope="col" class="col-2 font-weight-normal">
          <div class="form-check">
            <input
              @change="checkVehicles"
              ref="checkboxAll"
              class="form-check-input form-check-input-lg"
              type="checkbox"
            />
            <label class="form-check-label"> Vehiculo </label>
          </div>
        </th>
        <th scope="col" class="font-weight-normal">Usuario</th>
        <th scope="col" class="font-weight-normal">Estado</th>
        <th scope="col" class="font-weight-normal">Despachos</th>
        <th scope="col" class="font-weight-normal">Fecha despacho</th>
        <th scope="col" class="font-weight-normal">Hora inicio</th>
        <th scope="col" class="font-weight-normal">Fecha de carga</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="route in getFilteredRoutes" :key="route.patent">
        <td class="border-right">
          <div class="form-check">
            <input
              ref="checkbox"
              class="form-check-input form-check-input-lg"
              type="checkbox"
            />
            <label class="font-weight-light">
              {{ route.patent }}
            </label>
          </div>
        </td>
        <td class="text-muted">{{ route.userName }}</td>
        <td class="text-muted">{{ route.status }}</td>
        <td class="text-muted text-center">{{ route.totalDeliveries }}</td>
        <td class="text-muted">{{ onlyDate(route.date) }}</td>
        <td class="text-muted">{{ onlyTime(route.date) }}</td>
        <td class="text-muted">{{ route.loadDate }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getFilteredRoutes']),
  },
  methods: {
    onlyDate(value) {
      let date = value.split(' ')[0]
      return date
    },
    onlyTime(value) {
      let time = value.split(' ')[1]
      return time
    },

    checkAll() {
      this.$refs.checkbox.forEach((el) => (el.checked = true))
    },
    unCheckAll() {
      this.$refs.checkbox.forEach((el) => (el.checked = false))
    },

    checkVehicles() {
      if (!this.$refs.checkboxAll.checked) {
        this.unCheckAll()
      } else {
        this.checkAll()
      }
    },
  },
}
</script>
<style scoped>
.table {
  min-height: 200px !important;
}
</style>

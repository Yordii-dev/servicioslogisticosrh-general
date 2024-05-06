<template>
  <div class="p-3 container-associates position-relative">
    <div class="head p-1 d-flex justify-content-between align-items-center">
      <h5></h5>
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#modalNewAssociate"
      >
        Establecer grupo a vehiculo
      </button>
      <VehicleModal />
    </div>

    <br />
    <div class="data p-1 bg-white">
      <div class="row">
        <h6 class="col">Placa</h6>
        <h6 class="col-4">Grupo</h6>
      </div>
      <div class="associations">
        <div
          class="association row border-top text-secondary"
          v-for="vehicle in vehicles"
          v-bind:key="vehicle.id"
        >
          <p class="col">{{ vehicle.patent }}</p>

          <p class="col-4">{{ vehicle.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VehicleModal from '../components/modals/VehicleModal.vue'
import { loaderPage } from '../helpers/loaderPage'

import { mapMutations } from 'vuex'
export default {
  components: { VehicleModal },
  name: 'ConfigAssociate',
  data() {
    return {
      token: localStorage.getItem('token_user'),

      vehicles: [],
    }
  },
  methods: {
    ...mapMutations(['setAppError', 'setConfigActiveTab']),
    async getVehiclesWithGroup() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/vehicles/G`

        let res = await fetch(URL, {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }),
          response = await res.json()
        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al obtener asociaciones`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    this.setConfigActiveTab('Vehiculos')
    let loader = loaderPage(this.$loading, '.container-associates')
    let response = await this.getVehiclesWithGroup()

    if (typeof response === 'undefined') return

    if (response.status == 'success') {
      this.vehicles = response.data.vehicles

      loader.hide()
    }
  },
}
</script>
<style scoped>
.container-associates {
  min-height: 500px;
}
</style>

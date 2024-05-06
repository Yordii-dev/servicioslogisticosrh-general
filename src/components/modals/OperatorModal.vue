<template>
  <div
    class="modal fade"
    id="modalNewUser"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <form class="modal-content" @submit.prevent="newOperator">
        <div class="modal-header">
          <h4 class="modal-title text-center">Crear operador</h4>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <label>Nombre completo</label>
              <input
                name="fullName"
                type="text"
                class="form-control"
                required
                v-model="data.fullName"
              />
            </div>
            <br />
            <div class="form-group">
              <label>Nombre de usuario</label>
              <input
                name="userName"
                type="text"
                class="form-control"
                required
                v-model="data.userName"
              />
            </div>
            <br />
            <div class="form-group">
              <label>Pin</label>
              <input
                name="pin"
                type="text"
                class="form-control"
                required
                v-model="data.pin"
              />
            </div>
            <br />
            <div class="form-group">
              <label>Vehiculos disponibles</label>
              <select
                name="assignedVehicle"
                class="form-select form-control"
                required
                v-model="data.vehicleId"
              >
                <option selected hidden></option>
                <option
                  v-for="vehicle in vehicles"
                  :value="vehicle.id"
                  :key="vehicle.id"
                >
                  {{ vehicle.patent }}
                </option>
              </select>
              <small class="form-text text-muted"
                >Vehiculo que se otorgara a este operador</small
              >
            </div>
            <br />
            <div class="form-group">
              <label>Fecha de creacion</label>
              <input
                name="creationDate"
                disabled
                type="date"
                class="form-control"
                :value="creationDate"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <SpinnerButton
            classes="btn-primary"
            :loading="loaderSpinner"
            text="Crear"
            textLoading="Creando"
          />

          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { actualDateTime, onlyDate } from '@/helpers/date'
import { mapMutations } from 'vuex'
import SpinnerButton from '../SpinnerButton.vue'

export default {
  components: { SpinnerButton },
  data() {
    return {
      token: localStorage.getItem('token_user'),
      loaderSpinner: false,
      vehicles: [],
      creationDate: onlyDate(actualDateTime()),
      data: {
        fullName: '',
        userName: '',
        pin: '',
        /* date: actualDateTime(), */ //Debe ser la fecha en la que se crea un grupo y no en la que se abre el modal
        vehicleId: 0,
      },
    }
  },
  methods: {
    ...mapMutations(['setAppError']),
    async getVehicles_G_NO_O() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/vehicles/G-NO-O`

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
          error.statusText || `Error de Front: Al obtener vehiculos disponibles`
        this.setAppError(message)
      }
    },
    async newOperator() {
      this.loaderSpinner = true
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/operators`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
            },
            body: JSON.stringify({ ...this.data, date: actualDateTime() }),
          }),
          response = await res.json()
        if (response.error) throw response
        if (response.status == 'success') {
          this.loaderSpinner = false
          location.reload()
        } else {
          alert('Halgo ha salido mal')
        }
      } catch (error) {
        let message = error.statusText || `Error de Front: Al crear operador`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    let response = await this.getVehicles_G_NO_O()
    if (typeof response == 'undefined') return

    if (response.status == 'success') {
      this.vehicles = response.data.vehicles
    }
  },
}
</script>

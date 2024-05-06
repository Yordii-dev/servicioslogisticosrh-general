<template>
  <div
    class="modal fade"
    id="modalNewAssociate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <form class="modal-content" @submit.prevent="updateVehicle">
        <div class="modal-header">
          <h4 class="modal-title text-center">Establecer</h4>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <label for="">Grupos</label>

              <select
                name="group"
                class="form-select form-control"
                required
                v-model="groupId"
              >
                <option selected hidden></option>
                <option
                  v-for="group in groups"
                  :value="group.id"
                  :key="group.id"
                >
                  {{ group.name }}
                </option>
              </select>
            </div>
            <br />
            <div class="form-group">
              <label for="">Vehiculos disponibles</label>

              <select
                name="vehicle"
                class="form-select form-control"
                required
                v-model="vehicleId"
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
            </div>
            <br />
          </div>
        </div>
        <div class="modal-footer">
          <SpinnerButton
            classes="btn-primary"
            :loading="loaderSpinner"
            text="Establecer"
            textLoading="Estableciendo"
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
import { mapMutations } from 'vuex'
import SpinnerButton from '../SpinnerButton.vue'
export default {
  components: { SpinnerButton },
  data() {
    return {
      token: localStorage.getItem('token_user'),

      loaderSpinner: false,
      vehicles: [],
      groups: [],

      vehicleId: null,
      groupId: null,
    }
  },
  methods: {
    ...mapMutations(['setAppError']),
    async getGroups() {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/groups`, {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }),
          response = await res.json()
        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText ||
          `Error de Front: Al obtener grupos para associaciones`
        this.setAppError(message)
      }
    },

    async getVehiclesWithoutGroup() {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/vehicles/NO-G`, {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }),
          response = await res.json()
        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText ||
          `Error de Front: Al obtener vehiculos para associaciones`
        this.setAppError(message)
      }
    },

    async updateVehicle() {
      this.loaderSpinner = true
      try {
        let res = await fetch(
            `${process.env.VUE_APP_API_USER}/vehicles/${this.vehicleId}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.token,
              },
              body: JSON.stringify({
                groupId: this.groupId,
              }),
            }
          ),
          response = await res.json()

        if (response.error) throw response
        if (response.status == 'success') {
          this.loaderSpinner = false
          location.reload()
        } else {
          alert('Halgo ha salido mal')
        }
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al establecer grupo a vehiculo`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    let responseG = await this.getGroups()
    if (typeof responseG === 'undefined') return

    if (responseG.status == 'success') {
      this.groups = responseG.data.groups
    }

    let responseV = await this.getVehiclesWithoutGroup()
    if (typeof responseV === 'undefined') return

    if (responseV.status == 'success') {
      this.vehicles = responseV.data.vehicles
    }
  },
}
</script>

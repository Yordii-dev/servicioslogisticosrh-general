<template>
  <div class="dash-top d-flex justify-content-between align-items-center mb-2">
    <div class="d-flex align-items-center">
      <h6 class="mt-2 mx-2">[{{ totalVehicles }}]</h6>
      <h6 class="mt-2">Vehiculos</h6>
    </div>
    <div
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Ultima importacion"
      class="mx-3"
      v-show="loadDate"
    >
      <small class="badge badge-dark font-weight-light">{{ loadDate }}</small>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  props: ['totalVehicles'],
  data() {
    return {
      token: localStorage.getItem('token_user'),

      loadDate: null,
    }
  },

  methods: {
    ...mapMutations(['setAppError']),
    async getLastLoad() {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/loads/latest`, {
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
          'Error de Front: Al obtener fecha ultima de importacion'
        this.setAppError(message)
        this.$emit('error', error)
      }
    },
  },
  async mounted() {
    let response = await this.getLastLoad()

    if (typeof response === 'undefined') return

    if (response.status == 'success') {
      this.loadDate = response.data.load.date
    }
  },
}
</script>

<style scoped>
.dash-top {
  background-color: #131a26;
  color: white;
}
.dash-top span {
  margin-left: 5px;
  margin-right: 10px;
}
</style>

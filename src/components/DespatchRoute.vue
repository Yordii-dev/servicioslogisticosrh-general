<template>
  <div class="container-routes position-relative">
    <h5>Rutas</h5>
    <div class="d-flex justify-content-between mt-3">
      <div class="card text-center p-3" style="width: 18rem">
        <h2>{{ totalRoutes }}</h2>
        <div class="card-body">
          <p class="card-text">Total de rutas</p>
        </div>
      </div>

      <div class="card text-center p-3" style="width: 18rem">
        <h2>{{ avgDespatchesPerRoute }}</h2>
        <div class="card-body">
          <p class="card-text">Despaches promedio por ruta</p>
        </div>
      </div>

      <div class="card text-center p-3 text-muted" style="width: 18rem">
        <h2>X</h2>
        <div class="card-body">
          <p class="card-text">Cumplimiento de planificacion por ruta</p>
        </div>
      </div>
      <div class="card text-center p-3" style="width: 18rem">
        <h2>{{ minDespatchesPerRoute }}</h2>
        <div class="card-body">
          <p class="card-text">Minimo de despachos por ruta</p>
        </div>
      </div>
      <div class="card text-center p-3" style="width: 18rem">
        <h2>{{ maxDespatchesPerRoute }}</h2>
        <div class="card-body">
          <p class="card-text">Maximo de despachos por ruta</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { loaderPage } from '../helpers/loaderPage'

export default {
  data() {
    return {
      token: localStorage.getItem('token_user'),
      routes: [],
    }
  },
  computed: {
    totalRoutes() {
      return this.routes.length
    },
    avgDespatchesPerRoute() {
      let totalDespatches = this.routes.reduce(
        (acc, el) => acc + el.totalDeliveries,
        0
      )
      let avg = totalDespatches / this.totalRoutes

      return avg ? avg.toFixed(1) : 0
    },
    minDespatchesPerRoute() {
      let min = Math.min(...this.routes.map((el) => el.totalDeliveries))
      return min && min !== Infinity && min !== -Infinity ? min.toFixed(1) : 0
    },
    maxDespatchesPerRoute() {
      let max = Math.max(...this.routes.map((el) => el.totalDeliveries))

      return max && max !== Infinity && max !== -Infinity ? max.toFixed(1) : 0
    },
  },
  methods: {
    ...mapMutations(['setAppError']),
    async getRoutes() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/routes/latest`

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
          error.statusText || `Error de Front: Al obtener rutas: ${error}`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    let loader = loaderPage(this.$loading, '.container-routes')
    let response = await this.getRoutes()

    if (typeof response == 'undefined') return

    if (response.status == 'success') {
      this.routes = response.data.routes

      loader.hide()
    }
  },
}
</script>

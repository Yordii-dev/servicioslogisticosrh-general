<template>
  <div class="container-route d-flex mt-4 justify-content-between">
    <RouteFilter />
    <div class="w-75">
      <TopTableRoute />
      <div
        class="overflow-auto container-table-routes position-relative align-self-start mt-3"
      >
        <RoutesTable />
      </div>
    </div>
  </div>
</template>

<script>
import RouteFilter from '../components/RouteFilter.vue'
import TopTableRoute from '../components/chunks/TopTableRoute.vue'
import RoutesTable from '../components/tables/RoutesTable.vue'

import { loaderPage } from '../helpers/loaderPage'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { RouteFilter, TopTableRoute, RoutesTable },
  data() {
    return {
      token: localStorage.getItem('token_user'),
    }
  },

  computed: {
    ...mapState(['route']),
  },
  methods: {
    ...mapMutations(['setAppError', 'setRoutesData', 'setRoutesActiveTab']),
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
    let loader = loaderPage(this.$loading, '.container-table-routes')
    this.setRoutesActiveTab('Tabla')

    let response = await this.getRoutes()
    if (typeof response == 'undefined') return

    if (response.status == 'success') {
      this.setRoutesData(response.data.routes)
      loader.hide()
    }
  },
}
</script>
<style scope>
.container-route {
  height: 60vh;
}
.container-table-routes {
  height: 400px !important;
}
.container-table-routes::-webkit-scrollbar {
  display: none;
}
</style>

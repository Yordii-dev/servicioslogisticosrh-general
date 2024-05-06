<template>
  <div class="p-3 container-users position-relative">
    <TopConfigOperator />
    <div class="data p-1 bg-white">
      <div class="row">
        <h6 class="col">Nombre completo</h6>
        <h6 class="col">Nombre de usuario</h6>
        <h6 class="col">Pin</h6>
        <h6 class="col">Vehiculo asignado</h6>
        <h6 class="col">Fecha de creacion</h6>
      </div>
      <div class="users">
        <div
          class="user row border-top text-secondary"
          v-for="operator in operators"
          v-bind:key="operator.id"
        >
          <p class="col">{{ operator.fullName }}</p>
          <p class="col">{{ operator.userName }}</p>
          <p class="col">{{ operator.pin }}</p>
          <p class="col">{{ operator.patent }}</p>
          <p class="col">{{ operator.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopConfigOperator from '../components/chunks/TopConfigOperator.vue'
import { loaderPage } from '../helpers/loaderPage'

import { mapMutations } from 'vuex'
export default {
  components: { TopConfigOperator },
  name: 'ConfigUser',
  data() {
    return {
      token: localStorage.getItem('token_user'),
      operators: [],
    }
  },
  methods: {
    ...mapMutations(['setAppError', 'setConfigActiveTab']),
    async getOperators() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/operators`

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
          error.statusText || `Error de Front: Al obtener operadores`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    this.setConfigActiveTab('Operadores')
    let loader = loaderPage(this.$loading, '.container-users')
    let response = await this.getOperators()

    if (typeof response === 'undefined') return

    if (response.status == 'success') {
      this.operators = response.data.operators
      loader.hide()
    }
  },
}
</script>
<style scoped>
.container-users {
  min-height: 500px;
}
</style>

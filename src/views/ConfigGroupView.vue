<template>
  <div class="p-3 container-groups position-relative">
    <div class="head p-1 d-flex justify-content-between align-items-center">
      <h5></h5>
      <div>
        <button class="btn bg-warning mx-2 text-white">Bitacora</button>
        <button
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modalNewGroup"
        >
          Crear grupo
        </button>
        <GroupModal></GroupModal>
      </div>
    </div>

    <br />
    <div class="data p-1 bg-white">
      <div class="row">
        <h6 class="col">Nombre</h6>
        <h6 class="col-4">Fecha de creacion</h6>
      </div>
      <div class="groups">
        <div
          class="group row border-top text-secondary"
          v-for="group in groups"
          v-bind:key="group.id"
        >
          <p class="col">{{ group.name }}</p>
          <p class="col-4">{{ group.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GroupModal from '../components/modals/GroupModal.vue'
import { loaderPage } from '../helpers/loaderPage'

import { mapMutations } from 'vuex'
export default {
  components: { GroupModal },
  name: 'ConfigGroup',
  data() {
    return {
      token: localStorage.getItem('token_user'),
      groups: [],
    }
  },
  methods: {
    ...mapMutations(['setAppError', 'setConfigActiveTab']),
    async getGroups() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/groups`

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
          error.statusText || `Error de Front: Al obtener grupos: ${error}`
        this.setAppError(message)
      }
    },
  },

  async mounted() {
    this.setConfigActiveTab('Grupos')
    let loader = loaderPage(this.$loading, '.container-groups')

    let response = await this.getGroups()

    if (typeof response === 'undefined') return

    if (response.status == 'success') {
      this.groups = response.data.groups
      loader.hide()
    }
  },
}
</script>
<style scoped>
.container-groups {
  min-height: 500px;
}
</style>

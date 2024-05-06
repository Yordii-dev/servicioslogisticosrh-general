<template>
  <div
    data-container-menu
    :class="isFetch && tracking.length > 0 ? 'bg-gray' : ''"
  >
    <DashMenu />
    <StepperModal />
    <div
      class="container d-flex flex-column container-tracking position-relative"
    >
      <router-link
        class="back-button d-block pt-2 pb-1 h6"
        :to="{ name: 'login' }"
        >Login</router-link
      >
      <DashTop :totalVehicles="this.tracking.length" @error="emitError" />

      <DashStatistics
        v-if="isFetch && tracking.length > 0"
        :tracking="tracking"
      />

      <DashEmpty v-if="isFetch && tracking.length == 0" />

      <div class="dashboard h-100" v-else>
        <br />
        <DashTrackin
          v-for="track in tracking"
          :key="track.placa"
          :data="track"
        ></DashTrackin>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import DashMenu from '../components/DashMenu.vue'

import DashTop from '../components/DashTop.vue'
import DashStatistics from '../components/DashStatistics.vue'
import DashTrackin from '../components/DashTrackin.vue'
import DashEmpty from '../components/DashEmpty.vue'
import StepperModal from '../components/modals/StepperModal.vue'
import { loaderPage } from '../helpers/loaderPage'

import { mapMutations } from 'vuex'

export default {
  name: 'TrackinView',
  components: {
    DashMenu,
    StepperModal,
    DashTop,
    DashStatistics,
    DashTrackin,
    DashEmpty,
  },
  data() {
    return {
      token: localStorage.getItem('token_user'),
      coords: {},
      isFetch: false,
      tracking: [],
    }
  },

  methods: {
    ...mapMutations(['setAppError']),

    async getTracking() {
      try {
        let res = await fetch(
            `${process.env.VUE_APP_API_USER}/tracking/latest`,
            {
              headers: {
                Authorization: 'Bearer ' + this.token,
              },
            }
          ),
          response = await res.json()
        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al obtener tracking: ${error}`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    let loader = loaderPage(this.$loading, '.container-tracking')

    let response = await this.getTracking()
    if (typeof response == 'undefined') return

    if (response.status == 'success') {
      this.tracking = response.data.tracking
      this.isFetch = true

      loader.hide()
    }
  },
}
</script>
<style scoped>
.bg-gray {
  background: rgb(240, 238, 238);
}

.back-button {
  color: #131a26 !important;
}

.container-tracking {
  height: 100vh;
}

.dashboard {
  height: 100%;
  overflow: auto;
}
.dashboard::-webkit-scrollbar {
  display: none;
}
</style>

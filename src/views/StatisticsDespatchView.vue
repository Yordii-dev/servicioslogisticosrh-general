<template>
  <div class="mt-3">
    <DespatchRoute />
    <hr class="hr" />
    <DeliveryEffect />
    <hr class="hr" />
    <DespatchEffect />
  </div>
</template>
<script>
import DespatchRoute from '@/components/DespatchRoute.vue'
import DeliveryEffect from '@/components/DeliveryEffect.vue'
import DespatchEffect from '@/components/DespatchEffect.vue'

import { mapMutations } from 'vuex'
import { loaderPage } from '../helpers/loaderPage'

export default {
  name: 'StatisticsDespatch',
  components: {
    DespatchRoute,
    DeliveryEffect,
    DespatchEffect,
  },
  data() {
    return {
      token: localStorage.getItem('token_user'),
    }
  },
  methods: {
    ...mapMutations([
      'setStatisticsHistory',
      'setStatiscticsActiveTab',
      'setAppError',
    ]),
    async getHistory() {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/history`, {
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
          `Error de Front: Al obtener historial de tracking: ${error}`
        this.setAppError(message)
      }
    },
  },
  async mounted() {
    this.setStatiscticsActiveTab('Despachos')
    let loaderTable = loaderPage(this.$loading, '.container-table-history')
    let loaderGauge = loaderPage(this.$loading, '.container-gauge')
    let loaderLineChart = loaderPage(this.$loading, '.container-line-chart')
    let loaderBarChart = loaderPage(this.$loading, '.container-bar-chart')
    let loaderTotalDespatch = loaderPage(
      this.$loading,
      '.container-total-despatch'
    )

    let response = await this.getHistory()
    if (typeof response == 'undefined') return

    if (response.status == 'success') {
      this.setStatisticsHistory(response.data.history)

      loaderGauge.hide()
      loaderTable.hide()
      loaderLineChart.hide()
      loaderBarChart.hide
      loaderTotalDespatch.hide
    }
  },
}
</script>
<style scoped>
.card:hover {
  box-shadow: 0 -3px 0 #00787e !important;
}

.hr {
  background: #00787e !important;
}

.text-italic {
  font-style: italic;
}
</style>

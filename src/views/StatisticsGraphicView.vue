<template>
  <div class="container-graphic d-flex mt-4 justify-content-between">
    <GraphicFilter />
    <GMap /> -
  </div>
</template>
<script>
import { compareTimes, onlyTime } from '@/helpers/date'
import { mapMutations } from 'vuex'
import GraphicFilter from '../components/GraphicFilter.vue'
import GMap from '../components/maps/GMap.vue'

export default {
  name: 'StatisticsGraphic',
  components: { GraphicFilter, GMap },
  data() {
    return {
      token: localStorage.getItem('token_user'),
      managed: [],
    }
  },

  methods: {
    ...mapMutations([
      'setStatisticsManaged',
      'setStatiscticsActiveTab',
      'setAppError',
    ]),

    async getManaged() {
      try {
        let res = await fetch(
            `${process.env.VUE_APP_API_USER}/managed/latest`,
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
          error.statusText || `Error de Front: Al obtener gestionados: ${error}`
        this.setAppError(message)
      }
    },
    getCompliance(el) {
      if (el.serviceTime == onlyTime(el.date)) return 'A Tiempo'
      if (compareTimes(el.serviceTime, onlyTime(el.date))) return 'Adelantado'
      if (compareTimes(onlyTime(el.date), el.serviceTime)) return 'Atrasado'
      return 'No Definido'
    },
    addComplianceToManaged(managed) {
      let managedWithCompliance = managed.map((el) => ({
        ...el,
        compliance: this.getCompliance(el),
      }))
      return managedWithCompliance
    },
  },
  async mounted() {
    this.setStatiscticsActiveTab('Mapa')
    let response = await this.getManaged()
    if (typeof response == 'undefined') return
    if (response.status == 'success') {
      let managed = this.addComplianceToManaged(response.data.managed) //Para poder filtrar facilmente 'compliance'
      this.setStatisticsManaged(managed)
      this.managed = managed
    }
  },
}
</script>

<style scoped>
.container-graphic {
  height: 80vh;
}
</style>

<template>
  <div class="d-flex flex-column justify-content-between pr-5">
    <div class="form-group">
      <h6>Fecha de carga:</h6>
      <input
        @change="getRoutesFromAPI"
        :disabled="dateNotFound"
        class="form-control"
        type="date"
        :min="firstLoadDate"
        v-model="routes.filter.loadDate"
      />
      <SpinnerText
        :loading="loadingSpinner"
        classes="form-text text-secondary"
        textLoading="Cargando fecha"
      />
      <small v-show="dateFound" class="form-text text-muted"
        >Fecha de ultima carga</small
      >
      <small v-show="dateNotFound" class="form-text text-muted"
        >Aun no hay fechas de carga</small
      >
      <!--    <small
        v-show="routes.filter.loadDate == lastLoadDate"
        class="form-text text-muted"
        >{{
          lastLoadDate ? 'Fecha de ultima carga.' : 'Sin fecha de carga.'
        }}</small
      > -->
    </div>
    <div class="form-group">
      <h6>Operador movil:</h6>
      <select class="form-control" v-model="routes.filter.operator">
        <option selected>Todos los operadores</option>
        <option v-for="operator in operators" :key="operator.id">
          {{ operator.userName }}
        </option>
      </select>
      <small class="form-text text-muted">Todos tus operadores.</small>
    </div>

    <div class="form-group">
      <h6>Centros de despachos:</h6>
      <select class="form-control" v-model="routes.filter.center">
        <option selected>Todos los centros</option>
        <option v-for="group in groups" :key="group.id">
          {{ group.name }}
        </option>
      </select>
      <small class="form-text text-muted">Tus grupos de trabajo.</small>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SpinnerText from '../components/SpinnerText.vue'
import { onlyDate } from '@/helpers/date'
export default {
  components: { SpinnerText },
  data() {
    return {
      loadingSpinner: true,
      token: localStorage.getItem('token_user'),
      lastLoadDate: '',
      firstLoadDate: '',
      operators: [],
      groups: [],
    }
  },
  computed: {
    ...mapState(['routes']),
    dateFound() {
      return (
        this.routes.filter.loadDate == this.lastLoadDate &&
        !this.loadingSpinner &&
        this.lastLoadDate
      )
    },
    dateNotFound() {
      return !this.lastLoadDate && !this.loadingSpinner
    },
  },
  methods: {
    ...mapMutations(['setAppError', 'setSomeRouteFilter']),
    ...mapActions(['getRoutesFromAPI']),

    async getLoad(date) {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/loads/${date}`, {
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
      }
    },
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
          error.statusText ||
          'Error de Front: Al obtener operadores para filtro'
        this.setAppError(message)
      }
    },

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
          error.statusText ||
          'Error de Front: Al obtener grupos/centros para filtro'
        this.setAppError(message)
      }
    },
  },

  async mounted() {
    //last Load Date
    let responseLastDate = await this.getLoad('latest')
    if (typeof responseLastDate == 'undefined') return
    if (responseLastDate.status == 'success') {
      //Para 'Fecha de ultima carga' de input date
      this.lastLoadDate = onlyDate(responseLastDate.data.load.date)
      this.setSomeRouteFilter({
        loadDate: this.lastLoadDate,
      })
    }
    this.loadingSpinner = false
    //First Load Date
    let responseFirstDate = await this.getLoad('first')
    if (typeof responseFirstDate == 'undefined') return
    if (responseFirstDate.status == 'success') {
      //Para bloquerar fechas atras de input date
      this.firstLoadDate = onlyDate(responseFirstDate.data.load.date)
    }

    //Operators
    let responseOperators = await this.getOperators()
    if (typeof responseOperators == 'undefined') return

    if (responseOperators.status == 'success') {
      this.operators = responseOperators.data.operators
    }

    //Groups/Centers
    let responseGroups = await this.getGroups()
    if (typeof responseGroups == 'undefined') return

    if (responseGroups.status == 'success') {
      this.groups = responseGroups.data.groups
    }
  },
}
</script>

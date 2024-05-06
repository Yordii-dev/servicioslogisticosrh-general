import { createStore } from 'vuex'

export default createStore({
  state: {
    appError: '',

    libs: {
      stepper: {
        stepActual: 1,
        titles: [],
        pastSteps: [],
        stepError: null,
      },
    },

    routes: {
      activeTab: 'Tabla',
      filter: {
        loadDate: '',
        operator: 'Todos los operadores',
        center: 'Todos los centros',
      },
      data: [],
    },

    statistics: {
      activeTab: 'Mapa',

      filter: {
        operator: 'Todos los operadores',
        managementDate: '',
        status: {
          Entregado: true,
          'No Entregado': true,
          'Entrega Parcial': true,
        },
        subStatus: 'Todos los Subestados',
        compliance: {
          'A Tiempo': true,
          Adelantado: true,
          Atrasado: true,
          'No Definido': true,
        },
      },
      managed: [],
      history: [],
    },
    config: {
      activeTab: 'Grupos',
    },
  },
  getters: {
    getFilteredManaged(state) {
      let filteredManaged = state.statistics.managed

      let operatorFilter = state.statistics.filter.operator
      let managementDateFilter = state.statistics.filter.managementDate
      let statusFilter = state.statistics.filter.status
      let subStatusFilter = state.statistics.filter.subStatus
      let complianceFilter = state.statistics.filter.compliance

      //Filtering operator
      if (operatorFilter == 'Todos los operadores') {
        filteredManaged = filteredManaged.filter((el) => el.operatorId)
      } else {
        filteredManaged = filteredManaged.filter(
          (el) => el.operatorId == operatorFilter
        )
      }

      //Filter date
      filteredManaged = filteredManaged.filter(
        (el) => el.date.split(' ')[0] == managementDateFilter
      )

      //Filter status
      filteredManaged = filteredManaged.filter((el) => statusFilter[el.status])

      //Filter subStatus
      if (subStatusFilter == 'Todos los Subestados') {
        filteredManaged = filteredManaged.filter((el) => el.subStatus)
      } else {
        filteredManaged = filteredManaged.filter(
          (el) => el.subStatus == subStatusFilter
        )
      }

      //Filter compliance
      filteredManaged = filteredManaged.filter(
        (el) => complianceFilter[el.compliance]
      )

      return filteredManaged
    },

    getFilteredRoutes(state) {
      let filteredRoute = state.routes.data

      let operatorFilter = state.routes.filter.operator
      let centerFilter = state.routes.filter.center

      //Filtering operator
      if (operatorFilter == 'Todos los operadores') {
        filteredRoute = filteredRoute.filter((el) => el.userName)
      } else {
        filteredRoute = filteredRoute.filter(
          (el) => el.userName == operatorFilter
        )
      }

      //Filtering group/despatch center
      if (centerFilter == 'Todos los centros') {
        filteredRoute = filteredRoute.filter((el) => el.group)
      } else {
        filteredRoute = filteredRoute.filter((el) => el.group == centerFilter)
      }
      return filteredRoute
    },

    getStepper(state) {
      return state.libs.stepper
    },
  },
  mutations: {
    /*
    Estilo 'Some' solo usado para  objectos que tienes bastantes opciones para actualizar
    */
    setAppError(state, appError) {
      state.appError = appError
    },

    //Routes
    setSomeRouteFilter(state, some) {
      let filter = state.routes.filter
      for (const property in some) {
        filter[property] = some[property]
      }
    },
    setRoutesData(state, data) {
      state.routes.data = data
    },

    setRoutesActiveTab(state, tab) {
      state.routes.activeTab = tab
    },

    //Statistics
    setStatisticsManaged(state, managed) {
      state.statistics.managed = managed
    },
    setStatisticsHistory(state, history) {
      state.statistics.history = history
    },
    setStatiscticsActiveTab(state, tab) {
      state.statistics.activeTab = tab
    },
    setSomeStatisticsFilter(state, some) {
      let filter = state.statistics.filter
      for (const property in some) {
        filter[property] = some[property]
      }
    },

    //Config
    setConfigActiveTab(state, tab) {
      state.config.activeTab = tab
    },

    //Stepper
    setStepperTitle(state, title) {
      state.libs.stepper.titles.push(title)
    },
    setStepperPast(state, pastStep) {
      state.libs.stepper.pastSteps.push(pastStep)
    },

    //El unico que falta actualizar a 'some'
    setSomeStepper(state, { field, value }) {
      state.libs.stepper[field] = value
    },
  },
  actions: {
    resetStepper(context) {
      context.commit('setSomeStepper', { field: 'stepActual', value: 1 })
      context.commit('setSomeStepper', { field: 'stepError', value: null })
      context.commit('setSomeStepper', { field: 'contentError', value: null })
      context.commit('setSomeStepper', { field: 'pastSteps', value: [] })
    },
    async getRoutesFromAPI({ commit }) {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/routes/${this.state.routes.filter.loadDate}`

        let res = await fetch(URL, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token_user'),
            },
          }),
          response = await res.json()
        if (response.error) throw response
        commit('setRoutesData', response.data.routes)
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al obtener rutas: ${error}`
        this.setAppError(message)
      }
    },
  },
  modules: {},
})

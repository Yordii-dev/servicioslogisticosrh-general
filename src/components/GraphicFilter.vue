<template>
  <div class="d-flex flex-column justify-content-between pr-5">
    <div class="form-group">
      <h6>Operador movil:</h6>
      <select class="form-control" v-model="statistics.filter.operator">
        <option selected>Todos los operadores</option>
        <option
          v-for="operator in operators"
          :key="operator.id"
          :value="operator.id"
        >
          {{ operator.userName }} ➜ {{ operator.patent }}
        </option>
      </select>
      <small class="form-text text-muted"
        >Tus operadores de esta utlima carga.</small
      >
    </div>
    <div class="form-group">
      <h6>Fecha de gestion:</h6>
      <input
        class="form-control"
        :disabled="dateNotFound"
        type="date"
        :min="firstManagementDate"
        v-model="statistics.filter.managementDate"
      />

      <SpinnerText
        :loading="loadingSpinner"
        classes="form-text text-secondary"
        textLoading="Cargando fecha"
      />
      <small v-show="dateFound" class="form-text text-muted"
        >Fecha de ultima gestion (todas las gestiones)</small
      >
      <small v-show="dateNotFound" class="form-text text-muted"
        >Aun no hay fechas de gestion</small
      >
    </div>
    <div class="form-group">
      <h6>Estado:</h6>
      <div class="options-states my-3 d-flex flex-column">
        <div class="form-check">
          <input
            id="deliveryCheck"
            checked
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.status.Entregado"
          />
          <label role="button" class="form-check-label" for="deliveryCheck">
            Entregado
          </label>
        </div>
        <div class="form-check">
          <input
            id="notDeliveryCheck"
            checked
            @change="statistics.filter.subStatus = 'Todos los Subestados'"
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.status['No Entregado']"
          />
          <label role="button" class="form-check-label" for="notDeliveryCheck">
            No Entregado
          </label>
        </div>
        <div class="form-check">
          <input
            id="partialCheck"
            checked
            @change="statistics.filter.subStatus = 'Todos los Subestados'"
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.status['Entrega Parcial']"
          />
          <label role="button" class="form-check-label" for="partialCheck">
            Entrega Parcial
          </label>
        </div>
      </div>
    </div>
    <div class="form-group">
      <h6>Subestados:</h6>
      <!-- Select for 'Entregado' -->
      <select
        v-show="isOnlyChecked('Entregado')"
        class="form-control"
        type="text"
        v-model="statistics.filter.subStatus"
      >
        <option
          v-for="(subStatus, index) in SUB_STATUS['Entregado']"
          :key="index"
        >
          {{ subStatus }}
        </option>
      </select>
      <!-- Select for 'No Entregado' -->
      <select
        v-show="isOnlyChecked('No Entregado')"
        class="form-control"
        type="text"
        v-model="statistics.filter.subStatus"
      >
        <option selected>Todos los Subestados</option>
        <option
          v-for="(subStatus, index) in SUB_STATUS['No Entregado']"
          :key="index"
        >
          {{ subStatus }}
        </option>
      </select>
      <!-- Select for 'Entrega Parcial' -->
      <select
        v-show="isOnlyChecked('Entrega Parcial')"
        class="form-control"
        type="text"
        v-model="statistics.filter.subStatus"
      >
        <option selected>Todos los Subestados</option>
        <option
          v-for="(subStatus, index) in SUB_STATUS['Entrega Parcial']"
          :key="index"
        >
          {{ subStatus }}
        </option>
      </select>
      <!-- Select for all status -->
      <select
        v-show="totalCheckedStatus >= 2"
        disabled
        class="form-control"
        type="text"
        v-model="statistics.filter.subStatus"
      >
        <option selected>Todos los Subestados</option>
      </select>

      <small v-show="totalCheckedStatus == 0" class="form-text text-muted"
        >Seleccionar un estado</small
      >

      <small v-show="isOnlyChecked('Entregado')" class="form-text text-muted"
        >'Entregado' no contiene subestados</small
      >
      <small v-show="isOnlyChecked('No Entregado')" class="form-text text-muted"
        >Subestados de 'No Entregado'</small
      >
      <small
        v-show="isOnlyChecked('Entrega Parcial')"
        class="form-text text-muted"
        >Subestados de 'Entrega Parcial'</small
      >
    </div>

    <div>
      <h6>Cumplimiento:</h6>
      <div class="options d-flex flex-column">
        <div class="form-check">
          <input
            id="inTimeCheck"
            checked
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.compliance['A Tiempo']"
          />
          <label role="button" class="form-check-label" for="inTimeCheck">
            A Tiempo
          </label>
        </div>
        <div class="form-check">
          <input
            id="aheadCheck"
            checked
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.compliance['Adelantado']"
          />
          <label role="button" class="form-check-label" for="aheadCheck">
            Adelantado
          </label>
        </div>
        <div class="form-check">
          <input
            id="backCheck"
            checked
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.compliance['Atrasado']"
          />
          <label role="button" class="form-check-label" for="backCheck">
            Atrasado
          </label>
        </div>
        <div class="form-check">
          <input
            id="notDefinedCheck"
            checked
            class="form-check-input"
            type="checkbox"
            v-model="statistics.filter.compliance['No Definido']"
          />
          <label role="button" class="form-check-label" for="notDefinedCheck">
            No Definido
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import SpinnerText from '../components/SpinnerText.vue'
import { maxDateTime, minDateTime, onlyDate } from '../helpers/date'
export default {
  components: { SpinnerText },
  data() {
    return {
      loadingSpinner: true,
      token: localStorage.getItem('token_user'),
      lastManagementDate: '',
      firstManagementDate: '',
      operators: [],
      SUB_STATUS: {
        'En Ruta': [],
        Entregado: [],
        'No Entregado': [
          'TEL01: Local Cerrado',
          'TEL02: Sin Dinero',
          'TEL04: Ausente',
          'TEL05: No hizo pedido',
          'TEL06: Por precio de producto',
          'TEL07: Direccion errada',
          'TEL08: Vencimiento cercano',
          'TEL09: Mercaderia deteriorada',
          'TEL10: Asalto/Robo',
          'TEL11: Fuera de horario',
          'TEL12: Fallas Mecanicas',
          'TEL13: Error de picking',
          'TEL14: Falta de Tiempo',
          'TEL15: Por cambios',
          'TEL16: Exceso de Tiempo de Espera',
          'TEL17: Error de Sistema',
          'TEL18: Error de Geoposicion',
          'TEL19: Error toma de pedido',
        ],
        'Entrega Parcial': [
          'TEL01: Error toma de pedido',
          'TEL02: Por precio de producto',
          'TEL03: Vencimiento cerano',
          'TEL04: Mercaderia deteriorada',
          'TEL05: Error de picking',
          'TEL06: Por cambios',
        ],
        'Devoluciones Programadas': [
          'Recojo completo',
          'Recojo parcial',
          'Recojo no efectuado',
        ],
      },
    }
  },
  computed: {
    ...mapState(['statistics']),
    ...mapGetters(['getFilteredManaged']),

    dateFound() {
      return (
        this.statistics.filter.managementDate == this.lastManagementDate &&
        !this.loadingSpinner &&
        this.lastManagementDate
      )
    },
    dateNotFound() {
      return !this.lastManagementDate && !this.loadingSpinner
    },

    //Obtiene cuantos checkeds de status estan activados
    totalCheckedStatus() {
      let arrValues = Object.values(this.statistics.filter.status)
      let onlyCheckeds = arrValues.filter((el) => el)

      return onlyCheckeds.length
    },
  },

  methods: {
    ...mapMutations(['setSomeStatisticsFilter']),

    async getActiveOperators() {
      try {
        const URL = `${process.env.VUE_APP_API_USER}/operators/A`
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
          `Error de Front: Al obtener operadores activos: ${error}`
        this.setAppError(message)
      }
    },

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

    //Determina si 'status' es el unico habilitado
    isOnlyChecked(status) {
      return (
        this.statistics.filter.status[status] && this.totalCheckedStatus == 1
      )
    },
  },

  async mounted() {
    //last and First Management Date
    let response = await this.getManaged()
    if (typeof response == 'undefined') return
    if (response.status == 'success') {
      if (response.data.managed.length == 0) {
        //No hay ninguna gestion hecha aun
        this.lastManagementDate = null
      } else {
        let dates = response.data.managed.map((el) => el.date)

        //Para 'Fecha de ultima gestion' de input date
        this.lastManagementDate = onlyDate(maxDateTime(dates))
        this.setSomeStatisticsFilter({
          managementDate: this.lastManagementDate,
        })

        //Para bloquerar fechas atras de input date
        this.firstManagementDate = onlyDate(minDateTime(dates))
      }
      this.loadingSpinner = false
    }

    let responseActOperators = await this.getActiveOperators()

    if (typeof responseActOperators == 'undefined') return
    if (responseActOperators.status == 'success') {
      this.operators = responseActOperators.data.operators
    }
  },
}
</script>

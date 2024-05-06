<template>
  <Stepper>
    <StepperHeader>
      <Step step="1" text="Subir Doc." />
      <Step step="2" text="Validar Doc." />
      <Step step="3" text="Almacenar data" />
    </StepperHeader>
    <StepperBody>
      <StepperContent step="1">
        <div
          v-if="!file"
          class="h-100 text-center d-flex align-items-center justify-content-center"
        >
          <label class="btn border text-primary" for="importer"
            >Seleccionar archivo</label
          >
          <input
            id="importer"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            hidden
            type="file"
            @change="handleSelectFile"
          />
        </div>
        <div v-else class="w-50 m-auto d-flex flex-column">
          <div
            class="file-selected w-100 mx-auto d-flex mt-4 justify-content-between align-items-center px-3 py-2"
          >
            <h2 class="m-0">
              <i class="fa-solid fa-file flex-strech"></i>
            </h2>
            <div class="d-flex flex-column flex-grow-1 mx-3">
              <span class="name">{{ file.name }}</span>
              <span class="kb">{{ (file.size / 1024).toFixed(2) }} kB</span>
            </div>
            <i @click="file = null" role="button" class="fa-solid fa-xmark"></i>
          </div>
          <button
            @click="handleUpload"
            class="btn border text-info align-self-end mt-3"
          >
            Subir
          </button>
        </div>
      </StepperContent>
      <StepperContent step="2">
        <ContentValidate :contentError="contentError" />
      </StepperContent>
      <StepperContent step="3">
        <div
          class="h-100 alert alert-success d-flex align-items-center justify-content-center"
        >
          <h5>Data almacenada</h5>
        </div>
      </StepperContent>
    </StepperBody>
    <StepperFooter>
      <div class="d-flex justify-content-end">
        <div v-if="getStepper.stepActual == 3">
          <SpinnerButton
            @click="handleCancelImport"
            text="Cancelar Importacion"
            textLoading="Cancelando"
            :loading="loadingCancelSpinner"
            classes="btn-sm alert-danger mr-4"
          />
          <SpinnerButton
            @click="handleContainImport"
            text="Contener Importacion"
            textLoading="Conteniendo"
            :loading="loadingContainSpinner"
            classes="btn-sm alert-success"
          />
        </div>
        <button
          v-else
          class="btn btn-sm alert-secondary"
          data-dismiss="modal"
          @click="handleCloseStepper"
        >
          Cerrar
        </button>
      </div></StepperFooter
    >
  </Stepper>
</template>

<script>
import Stepper from '../libs/Stepper/Stepper.vue'
import StepperHeader from '../libs/Stepper/StepperHeader.vue'
import StepperBody from '../libs/Stepper/StepperBody.vue'
import StepperContent from '../libs/Stepper/StepperContent.vue'
import ContentValidate from '../components/chunks/ContentValidate.vue'
import StepperFooter from '../libs/Stepper/StepperFooter.vue'
import SpinnerButton from '../components/SpinnerButton.vue'
import { actualDateTime } from '../helpers/date'
import Step from '../libs/Stepper/Step.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'StepperVue',
  components: {
    Stepper,
    StepperHeader,
    Step,
    StepperBody,
    StepperContent,
    ContentValidate,
    StepperFooter,
    SpinnerButton,
  },

  data() {
    return {
      token: localStorage.getItem('token_user'),
      loadingCancelSpinner: false,
      file: null,
      contentError: {},
      loadId: null,
    }
  },
  computed: {
    ...mapGetters(['getStepper']),
  },
  methods: {
    ...mapActions(['resetStepper']),
    ...mapMutations(['setSomeStepper', 'setStepperPast', 'setAppError']),

    async uploadFile(file) {
      try {
        this.setSomeStepper({ field: 'stepActual', value: 2 })
        this.setStepperPast(1)

        let fData = new FormData()
        fData.append('file', file)
        fData.append('date', actualDateTime())

        let res = await fetch(`${process.env.VUE_APP_API_USER}/loads`, {
            method: 'POST',
            body: fData,
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }),
          response = await res.json()

        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al importar archivo: ${error}`
        this.setAppError(message)
      }
    },
    async deleteLoad(id) {
      try {
        let res = await fetch(`${process.env.VUE_APP_API_USER}/loads/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }),
          response = await res.json()

        if (response.error) throw response
        return response
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al eliminar entrega: ${error}`
        this.setAppError(message)
      }
    },

    async handleSelectFile() {
      const $importer = document.getElementById('importer')

      if (!$importer.files[0]) return
      this.file = $importer.files[0]
    },

    async handleUpload() {
      let loader = this.$loading.show({
        // Optional parameters
        container: document.querySelector('.content-validate'),
        canCancel: false,
        color: '#007bff',
        height: '30',

        onCancel: false,
      })

      if (!this.file) return

      let response = await this.uploadFile(this.file)

      if (typeof response === 'undefined') return

      if (response.status == 'success') {
        this.loadId = response.data.loadId
        this.setSomeStepper({ field: 'stepActual', value: 3 })
        this.setStepperPast(2)
        this.setStepperPast(3)
        loader.hide()
      }

      if (response.status == 'fail') {
        this.contentError = response.data
        this.setSomeStepper({ field: 'stepError', value: 2 })
        loader.hide()
      }
    },

    async handleCancelImport() {
      this.loadingCancelSpinner = true
      let response = await this.deleteLoad(this.loadId)
      console.log(response)
      if (typeof response == 'undefined') return

      if (response.status == 'success') {
        this.loadingCancelSpinner = false
        location.reload()
      }
    },

    async handleContainImport() {
      this.loadingContainSpinner = true
      this.handleCloseStepper()
      location.reload()
    },

    handleCloseStepper() {
      this.resetStepper()
      this.file = null
      this.contentError = {}
    },
  },

  mounted() {
    /* window.addEventListener('beforeunload', (evento) => {
      evento.preventDefault()
      evento.returnValue = ''
      return ''
    }) */
  },
}
</script>

<style scoped>
.file-selected {
  color: #9aa0a6;
  background: linear-gradient(to right, #e8f0fe 50%, #f1f3f4 50%);
}

.file-selected .name {
  color: #3c4043;
  font-size: 16px;
  font-weight: 500;
  text-overflow: ellipsis;
}
.file-selected .kb {
  color: #5f6368;
  font-size: 14px;
  font-weight: 400;
}
</style>

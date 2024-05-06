<template>
  <div
    class="modal fade"
    id="modalNewGroup"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <form class="modal-content" @submit.prevent="newGroup">
        <div class="modal-header">
          <h4 class="modal-title text-center">Crear grupo</h4>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group">
              <label>Nombre de grupo</label>
              <input
                name="name"
                type="text"
                class="form-control"
                required
                v-model="data.name"
              />
            </div>
            <br />
            <div class="form-group">
              <label>Fecha de creacion</label>

              <input
                name="creationDate"
                disabled
                type="date"
                required
                class="form-control"
                v-model="creationDate"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <SpinnerButton
            classes="btn-primary"
            :loading="loaderSpinner"
            text="Crear"
            textLoading="Creando"
          />
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { actualDateTime, onlyDate } from '@/helpers/date'
import { mapMutations } from 'vuex'
import SpinnerButton from '../SpinnerButton.vue'
export default {
  components: {
    SpinnerButton,
  },
  data() {
    return {
      token: localStorage.getItem('token_user'),
      loaderSpinner: false,
      creationDate: onlyDate(actualDateTime()),
      data: {
        name: '',
        /* date: actualDateTime(), */ //Debe ser la fecha en la que se crea un grupo y no en la que se abre el modal
      },
    }
  },

  methods: {
    ...mapMutations(['setAppError']),
    async newGroup() {
      this.loaderSpinner = true
      try {
        const URL = `${process.env.VUE_APP_API_USER}/groups`
        let res = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.token,
            },
            body: JSON.stringify({ ...this.data, date: actualDateTime() }),
          }),
          response = await res.json()

        if (response.error) throw response

        if (response.status == 'success') {
          this.loaderSpinner = false
          location.reload()
        }
        if (response.status == 'fail') {
          alert('Halgo ha salido mal')
        }
      } catch (error) {
        let message =
          error.statusText || `Error de Front: Al crear grupo: ${error}`
        this.setAppError(message)
      }
    },
  },
}
</script>

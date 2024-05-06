<template>
  <div
    class="modal fade"
    id="updateRoute"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="alert alert-info modal-content">
        <div class="modal-body">
          <h5 class="">¿Desea finalizar esta ruta?</h5>
          <span>Se perdera el acceso a la gestion mobil.</span>
        </div>
        <div class="modal-footer d-flex justify-content-evenly">
          <SpinnerButton
            data-dismiss="modal"
            @click="updateRoute"
            classes="runded btn-info"
            :loading="loadingSpinner"
            text="Finalizar"
            textLoading="Finalizando"
          />
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerButton from '../SpinnerButton.vue'
export default {
  components: { SpinnerButton },
  data() {
    return {
      loadingSpinner: false,
    }
  },

  methods: {
    updateRoute() {},
  },
}
</script>

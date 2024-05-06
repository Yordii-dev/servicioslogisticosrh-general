<template>
  <div
    class="modal fade"
    id="deleteRoute"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="alert alert-danger modal-content">
        <div class="modal-body">
          <h5 class="">¿Desea eliminar esta ruta?</h5>
          <span>La ruta se eliminara por completo. Accion no reversible.</span>
        </div>
        <div class="modal-footer d-flex justify-content-evenly">
          <SpinnerButton
            data-dismiss="modal"
            @click="deleteRoute"
            classes="rounded btn-danger border-0"
            :loading="loadingSpinner"
            text="Eliminar"
            textLoading="Eliminando"
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
    deleteRoute() {},
  },
}
</script>

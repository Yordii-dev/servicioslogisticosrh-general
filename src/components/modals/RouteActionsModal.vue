<template>
  <div
    class="modal fade"
    id="routeActions"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <p role="button" data-toggle="modal" data-target="#createRoute">
            Iniciar ruta
          </p>
          <p role="button" data-toggle="modal" data-target="#updateRoute">
            Finalizar ruta
          </p>
          <p role="button" data-toggle="modal" data-target="#deleteRoute">
            Eliminar ruta
          </p>
        </div>
      </div>
    </div>

    <ConfirmCreateRouteModal />
    <ConfirmUpdateRouteModal />
    <ConfirmDeleteRouteModal />
  </div>
</template>

<script>
import ConfirmCreateRouteModal from '../modals/ConfirmCreateRouteModal.vue'
import ConfirmUpdateRouteModal from '../modals/ConfirmUpdateRouteModal.vue'
import ConfirmDeleteRouteModal from '../modals/ConfirmDeleteRouteModal.vue'
export default {
  components: {
    ConfirmCreateRouteModal,
    ConfirmUpdateRouteModal,
    ConfirmDeleteRouteModal,
  },
}
</script>

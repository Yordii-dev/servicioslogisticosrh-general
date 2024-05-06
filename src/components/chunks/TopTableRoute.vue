<template>
  <div>
    <div
      class="d-flex justify-content-between align-items-center pb-2 border-bottom"
    >
      <h4 class="font-weight-normal">Rutas</h4>
      <div>
        <button class="btn border">Asignar a ruta</button>
        <button class="btn btn-primary mx-2">
          <i class="fa-solid fa-upload mx-1"></i>
          Importar
        </button>
        <button class="btn btn-warning text-white">Nueva ruta</button>
      </div>
    </div>

    <button
      class="btn border mt-3"
      data-toggle="modal"
      data-target="#routeActions"
    >
      Acciones
    </button>

    <RouteActionsModal />
  </div>
</template>

<script>
import RouteActionsModal from '../modals/RouteActionsModal.vue'
export default {
  components: { RouteActionsModal },
}
</script>

<template>
  <div class="container-total position-relative mt-5">
    <div class="d-flex flex-column">
      <h4 class="text-muted">Total de despachos</h4>
      <div class="d-flex mb-3 align-items-center">
        <span class="text-warning h1">·</span>
        <span class="text-muted text-italic mx-2">
          Los graficos a continuacion visualizan datos de todos los despachos
          entregados y estimados en el rango de fecha seleccionada.</span
        >
      </div>
    </div>
    <div class="d-flex align-items-center w-75">
      <div class="w-50">
        <div id="despacho_statistics_circle" class=".ct-chart"></div>
      </div>
      <div class="w-50 mx-5">
        <p class="h5">Numero de despachos por sub-estado</p>
        <div
          class="d-flex w-100 justify-content-between align-items-center mt-4"
        >
          <span>533 sin subEstado (100.0%)</span>
          <div class="bg-success p-3 w-75"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loaderPage } from '../helpers/loaderPage'
export default {
  mounted() {
    let loader = loaderPage(this.$loading, '.container-total')
    loader.hide
  },
}
</script>

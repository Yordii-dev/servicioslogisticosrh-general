<template>
  <div class="despatches my-5">
    <div class="d-flex align-items-center">
      <h5 class="m-0">Despachos ·</h5>

      <h6 role="button" class="m-0">
        <span class="ml-2 badge badge-info font-weight-light"
          >Semana actual</span
        >
      </h6>
    </div>
    <div class="ml-2">
      <div class="mt-3">
        <h6>Cantidad de despachos por dia</h6>
        <DespachosChart></DespachosChart>
      </div>
      <div class="mt-5">
        <h6>Total de despachos</h6>
        <span class="mx-2">
          Los graficos a continuacion visualizan datos de todos los despachos
          entregados y estimados en el rango de fecha seleccionada.</span
        >
        <br />
        <br />
        <div class="container-total-despatch position-relative w-50 m-auto">
          <h6>Numero de despachos por sub-estado</h6>
          <div
            class="d-flex w-100 justify-content-between align-items-center mt-4"
          >
            <span>100 sin subEstado (100.0%)</span>
            <div class="bg-success p-3 w-75"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DespachosChart from '@/components/charts/DespachosChart.vue'

export default {
  components: {
    DespachosChart,
  },
}
</script>

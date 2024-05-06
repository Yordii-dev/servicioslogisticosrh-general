<template>
  <div class="delivery-effect mt-5">
    <div class="d-flex align-items-center">
      <h5 class="m-0">Entregas ·</h5>

      <h6 role="button" class="m-0">
        <span class="ml-2 badge badge-info font-weight-light">Mes actual</span>
      </h6>
    </div>
    <div class="ml-2">
      <div class="mt-3 d-flex justify-content-between">
        <div class="d-flex w-100 justify-content-between">
          <div class="w-25 mr-5">
            <h6>Efectividad Acumulada</h6>
            <AcumuladoChart></AcumuladoChart>
          </div>
          <div
            class="w-75 container-table-history position-relative overflow-auto ml-5 align-self-start"
          >
            <HistoryTable />
          </div>
        </div>
      </div>
      <div>
        <h6>Efectividad de Entregas</h6>
        <EntregasChart></EntregasChart>
      </div>
    </div>
  </div>
</template>
<script>
import AcumuladoChart from '@/components/charts/AcumuladoChart.vue'
import HistoryTable from '@/components/tables/HistoryTable.vue'
import EntregasChart from '@/components/charts/EntregasChart.vue'
export default {
  components: {
    AcumuladoChart,
    HistoryTable,
    EntregasChart,
  },
}
</script>

<style scoped>
.container-table-history {
  box-sizing: border-box;
  height: 400px !important;
}
.container-table-history::-webkit-scrollbar {
  display: none;
}
</style>

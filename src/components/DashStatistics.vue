<template>
  <div class="estadisticas-generales d-flex align-items-center p-2">
    <p class="h6">
      <span>{{ compliance }}%</span> Cumplimiento:
    </p>
    <p class="h6">
      Asignados: [<span>{{ assigned }}</span
      >]
    </p>
    <p class="h6">
      Gestionados: [<span>{{ managed }}</span
      >]
    </p>
    <p class="h6">
      Entregados: [<span>{{ delivered }}</span
      >]
    </p>
    <p class="h6">
      Parciales: [<span>{{ partial }}</span
      >]
    </p>
    <p class="h6">
      No Entregados: [<span>{{ noDelivered }}</span
      >]
    </p>
    <!--  <div class="flex-grow-1 text-right" @click="refresh">
      <i
        role="button"
        title="Refresh"
        class="fa fa-refresh pb-1"
        aria-hidden="true"
      ></i>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["tracking"],
  computed: {
    compliance() {
      return ((this.managed * 100) / this.assigned).toFixed(2)
    },
    assigned() {
      return this.tracking.reduce((acc, el) => acc + el.info.assigned, 0)
    },
    managed() {
      return this.tracking.reduce((acc, el) => acc + el.info.managed, 0)
    },
    delivered() {
      return this.tracking.reduce((acc, el) => acc + el.managed.delivered, 0)
    },
    partial() {
      return this.tracking.reduce((acc, el) => acc + el.managed.partial, 0)
    },
    noDelivered() {
      return this.tracking.reduce((acc, el) => acc + el.managed.notDelivered, 0)
    },
  },
}
</script>

<style scoped>
.estadisticas-generales {
  background-color: #131a26;
  color: white;
}

.estadisticas-generales > p {
  margin-right: 30px;
}

.estadisticas-generales p span {
  color: rgb(255, 255, 255);
  font-weight: bolder;
}
</style>

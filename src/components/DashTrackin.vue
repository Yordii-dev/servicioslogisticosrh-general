<template>
  <div
    class="placa d-flex justify-content-between align-items-start bg-white m-2 mb-3 p-2"
  >
    <div class="datos-principales">
      <div
        class="header d-flex justify-content-between align-items-center mb-1"
      >
        <div class="punto bg-secondary rounded-circle align-self-start"></div>
        <div class="codigo flex-grow-1">
          <p class="p-0 m-0 h6">{{ data.vehicle }}</p>
          <small
            :class="{
              'text-success': data.statusRoute == 'En Ruta',
              'text-danger': data.statusRoute == 'Sin operador asignado',
              'text-warning': data.statusRoute == 'Ruta no iniciada',
            }"
          >
            {{ data.statusRoute }}
          </small>
        </div>
        <i class="message fa-solid fa-comment h4"></i>
      </div>

      <div
        class="estadisticas p-1"
        title="Las demas gestiones no son visibles pero si consideradas para el cumplimiento"
      >
        <div class="entregados">
          <div class="d-flex justify-content-between">
            <p class="m-0 p-0">{{ data.managed.delivered }} Entregadas</p>
            <p class="m-0 p-0">{{ procentManaged }}%</p>
          </div>
          <progress class="w-100" max="100" :value="procentManaged"></progress>
        </div>

        <div class="parciales">
          <div class="d-flex justify-content-between">
            <p class="m-0 p-0">{{ data.managed.partial }} Parciales</p>
            <p class="m-0 p-0">{{ procentPartial }}%</p>
          </div>
          <progress class="w-100" max="100" :value="procentPartial"></progress>
        </div>

        <div class="no-entregados">
          <div class="d-flex justify-content-between">
            <p class="m-0 p-0">{{ data.managed.notDelivered }} No Entregadas</p>
            <p class="m-0 p-0">{{ procentNotManaged }}%</p>
          </div>
          <progress
            class="w-100"
            max="100"
            :value="procentNotManaged"
          ></progress>
        </div>
      </div>
    </div>

    <div class="valores d-flex flex-grow-1">
      <div class="asignados text-center p-1">
        <p class="h6">{{ data.info.assigned }}</p>
        <small class="text-secondary">Asignados</small>
      </div>
      <div class="gestionados text-center p-1">
        <p class="h6">{{ data.info.managed }}</p>
        <small class="text-secondary">Gestionados</small>
      </div>
    </div>

    <div class="cumplimiento flex-grow-1">
      <p class="m-0 h6">Cumplimiento</p>

      <div class="w-100 d-flex justify-content-between align-items-center">
        <progress class="w-100" max="100" :value="compliance"></progress>
        <p class="m-0 p-1 h6">{{ compliance }}%</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['data'],
  name: 'DashTrackin',
  computed: {
    //% Managed
    procentManaged() {
      return (
        (this.data.managed.delivered * 100) /
        this.data.info.assigned
      ).toFixed(2)
    },
    procentPartial() {
      return (
        (this.data.managed.partial * 100) /
        this.data.info.assigned
      ).toFixed(2)
    },
    procentNotManaged() {
      return (
        (this.data.managed.notDelivered * 100) /
        this.data.info.assigned
      ).toFixed(2)
    },
    //% compliance
    compliance() {
      return ((this.data.info.managed * 100) / this.data.info.assigned).toFixed(
        0
      )
    },
  },
}
</script>
<style scoped>
.datos .header {
  width: 300px;
}

.datos .header .punto {
  padding: 5px;
  margin-top: 5px;
  margin-right: 8px;
}

.datos .header .message {
  color: aqua;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 20px;
  padding: 5px 15px;
}

.datos .estadisticas div div p {
  color: rgb(58, 58, 58);
  font-size: 15px;
}

.datos .estadisticas div div p:nth-child(2) {
  font-weight: 500;
}
.valores div {
  border-left: 1px solid rgb(216, 216, 216);
}

.valores div:nth-child(1) {
  margin-left: 10px;
}
.valores div:nth-child(2) {
  border-right: 1px solid rgb(216, 216, 216);
}

/* Reinicializar estilos de progress*/
.estadisticas progress[value] {
  height: 8px;
  appearance: none;
  -webkit-appearance: none;
}
/* Estilos del fondo*/
.estadisticas progress[value]::-webkit-progress-bar {
  background-color: #e8e8e8;
  border-radius: 20px;
}

/* Estilos del valor*/

/* Entregados*/
.estadisticas .entregados progress[value]::-webkit-progress-value {
  background-color: #28a745;
  border-radius: 20px;
}

/* Parciales*/
.estadisticas .parciales progress[value]::-webkit-progress-value {
  background-color: #ffc107;
  border-radius: 20px;
}

/* No entregados*/
.estadisticas .no-entregados progress[value]::-webkit-progress-value {
  background-color: #dc3545;
  border-radius: 20px;
}

.estadisticas-generales p span {
  color: rgb(255, 255, 255);
  font-weight: bolder;
}

.estadisticas > div > div > p:nth-child(2) {
  margin-left: 8px !important;
}
</style>

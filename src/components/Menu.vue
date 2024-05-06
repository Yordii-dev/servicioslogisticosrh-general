<template>
  <div
    class="menu d-flex flex-column justify-content-between"
    :class="visible ? showMenu(position) : 'invisible'"
  >
    <div class="option" data-toggle="modal" data-target="#modalStepper">
      <i class="fa-solid fa-upload"></i>
      <label for="" class="my-0">Importar</label>
    </div>
    <hr class="bg-dark m-1" />
    <div class="option">
      <i class="fa-solid fa-route"></i>
      <label for="" class="my-0">Rutas</label>
    </div>
    <div class="option">
      <i class="fa-brands fa-guilded"></i>
      <label for="" class="my-0">Guias</label>
    </div>
    <div class="option">
      <i class="fa-solid fa-truck"></i>
      <label for="" class="my-0">Flota</label>
    </div>
    <div class="option" @click="statistics">
      <i class="fa-solid fa-chart-line"></i>
      <label for="" class="my-0">Estadisticas</label>
    </div>
    <div class="option">
      <i class="fa-solid fa-bell"></i>
      <label for="" class="my-0">Alertas</label>
    </div>
    <div class="option">
      <i class="fa-solid fa-users"></i>
      <label for="" class="my-0">Clientes</label>
    </div>
    <div class="option" @click="config">
      <i class="fa-solid fa-gear"></i>
      <label for="" class="my-0">Configuracion</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuContext",
  props: ["visible", "position", "config", "statistics"],
  data() {
    return {}
  },
  methods: {
    showMenu(coords) {
      const frame = document.querySelector(".menu")
      //Position in click coords
      frame.style.transform = `translate(${coords.x}px,${coords.y}px)`
    },
  },
}
</script>

<style scoped>
.menu {
  position: fixed;
  background-color: rgb(238, 238, 238);
  width: 170px;
  padding: 10px;
  height: 320px;
  box-shadow: 2px 2px 10px 4px rgb(194, 194, 194);
  cursor: pointer;
  z-index: 1000;
}
.menu div {
  display: flex;
  font-size: 17px;
  color: rgb(36, 36, 36);
  align-items: center !important;
}

.menu div i {
  margin-right: 5px;
  width: 25px !important;
}
.option:hover {
  font-weight: bold;
}

.option label {
  cursor: pointer;
}
</style>

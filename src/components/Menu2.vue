<template>
  <div
    ref="menu"
    class="menu d-flex flex-column justify-content-between"
    :class="visible ? showMenu(coords) : 'invisible'"
  >
    <div
      class="option"
      data-toggle="modal"
      :data-target="option.open"
      v-for="(option, i) in options"
      @click="option.action"
      :key="i"
    >
      <i :class="option.iconClass"></i>
      <label for="" class="my-0">{{ option.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuContext',
  props: ['options'],
  data() {
    return {
      visible: false,
      coords: {},
    }
  },
  methods: {
    activeMenu(e) {
      this.coords = {
        x: e.clientX,
        y: e.clientY,
      }
      this.visible = true
    },

    showMenu(coords) {
      this.$refs.menu.style.transform = `translate(${coords.x}px,${coords.y}px)`
    },
  },

  mounted() {
    const $container = document.querySelector('[data-container-menu]')

    $container.addEventListener('click', () => {
      this.visible = false
    })

    $container.addEventListener('contextmenu', (e) => {
      e.preventDefault()

      this.activeMenu(e)
    })
  },
}
</script>

<style scoped>
.invisible {
  visibility: hidden;
}
.visible {
  visibility: visible;
}

.menu {
  position: fixed;
  background-color: rgb(238, 238, 238);
  width: 160px;
  height: 320px;
  padding: 10px;

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

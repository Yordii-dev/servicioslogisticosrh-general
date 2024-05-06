<template>
  <Menu2 :options="optionsMenu"></Menu2>
</template>

<script>
import Menu2 from '../components/Menu2.vue'
export default {
  props: ['coords'],
  components: { Menu2 },
  data() {
    return {
      optionsMenu: [
        {
          open: '#modalStepper',
          iconClass: 'fa-solid fa-upload',
          name: 'Importar',
        },
        {
          action: () => {
            this.$router.push({ name: 'routes-table' })
          },
          iconClass: 'fa-solid fa-route',
          name: 'Rutas',
        },
        {
          action: () => {
            //this.$router.push({ name: '...' })
          },
          iconClass: 'fa-brands fa-guilded',
          name: 'Guias',
        },
        {
          action: () => {
            //this.$router.push({ name: '...' })
          },
          iconClass: 'fa-solid fa-truck',
          name: 'Flota',
        },
        {
          action: () => {
            this.$router.push({ name: 'graphic' })
          },
          iconClass: 'fa-solid fa-chart-line',
          name: 'Estadisticas',
        },
        {
          action: () => {
            //this.$router.push({ name: '...' })
          },
          iconClass: 'fa-solid fa-bell',
          name: 'Alertas',
        },
        {
          action: () => {
            //this.$router.push({ name: '...' })
          },
          iconClass: 'fa-solid fa-users',
          name: 'Clientes',
        },
        {
          action: () => {
            this.$router.push({ name: 'groups' })
          },
          iconClass: 'fa-solid fa-gear',
          name: 'Configuracion',
        },
      ],
    }
  },
  methods: {
    gotToPage(name) {
      this.$router.push({ name: name })
    },
  },
}
</script>

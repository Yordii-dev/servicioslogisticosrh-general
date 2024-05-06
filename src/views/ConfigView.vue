<template>
  <div class="container">
    <RowBack pageName="tracking" />
    <div class="bg-light">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link
            :class="{ active: config.activeTab == 'Grupos' }"
            class="nav-link"
            :to="{ name: 'groups' }"
            >Grupos</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :class="{ active: config.activeTab == 'Vehiculos' }"
            class="nav-link"
            :to="{ name: 'vehicles' }"
            >Vehiculos</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :class="{ active: config.activeTab == 'Operadores' }"
            class="nav-link"
            :to="{ name: 'operators' }"
            >Operadores</router-link
          >
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import RowBack from '../components/RowBack.vue'
export default {
  components: { RowBack },
  computed: {
    ...mapState(['config']),
  },
}
</script>

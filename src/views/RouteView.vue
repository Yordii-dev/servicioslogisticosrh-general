<template>
  <div class="container">
    <RowBack pageName="tracking" />
    <div class="bg-light">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link
            :class="{ active: routes.activeTab == 'Tabla' }"
            class="nav-link"
            :to="{ name: 'routes-table' }"
            >Tabla</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :class="{ active: routes.activeTab == 'Mapa' }"
            class="nav-link"
            :to="{ name: 'routes-graphic' }"
            >Mapa</router-link
          >
        </li>
      </ul>
    </div>
    <div class="container-statistics overflow-auto p-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RowBack from '../components/RowBack.vue'
export default {
  components: { RowBack },
  computed: {
    ...mapState(['routes']),
  },
}
</script>

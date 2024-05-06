<template>
  <div class="container vh-100 d-flex flex-column">
    <RowBack pageName="tracking" />
    <div class="bg-light">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link
            :class="{ active: statistics.activeTab == 'Mapa' }"
            class="nav-link"
            :to="{ name: 'graphic' }"
            >Mapa</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            :class="{ active: statistics.activeTab == 'Despachos' }"
            class="nav-link"
            :to="{ name: 'despatch' }"
            >Despachos</router-link
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
    ...mapState(['statistics']),
  },
}
</script>

<style scoped>
.container-statistics::-webkit-scrollbar {
  display: none !important;
}
</style>

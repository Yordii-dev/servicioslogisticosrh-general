<template>
  <div class="container-map">
    <div class="google-map" ref="googleMap"></div>
    <template v-if="google && map">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import { Loader } from 'google-maps'

export default {
  props: {
    mapConfig: Object,
    apiKey: String,
  },

  data() {
    return {
      google: null,
      map: null,
    }
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig)
    },
  },

  async mounted() {
    const loaderMap = new Loader(this.apiKey, {})
    this.google = await loaderMap.load()
    this.initializeMap()
  },
}
</script>

<style scoped>
.container-map {
  height: 80vh;
  width: 100%;
  margin: auto !important;
}
.google-map {
  width: 100%;
  height: 100%;
  flex-grow: 1;
}
</style>

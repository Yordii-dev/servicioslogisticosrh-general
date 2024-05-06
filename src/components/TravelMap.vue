<template>
  <GoogleMapLoader :mapConfig="mapConfig" :apiKey="apiKey">
    <template v-slot="{ google, map }">
      <GoogleMapMarker
        v-for="marker in getMarkers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>
<script>
import { mapGetters } from 'vuex'
import GoogleMapLoader from './GoogleMapLoader.vue'
import GoogleMapMarker from './GoogleMapMarker.vue'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
  },
  data() {
    return {
      markers: [],
    }
  },
  computed: {
    ...mapGetters(['getFilteredManaged']),
    apiKey() {
      return process.env.VUE_APP_KEY_GOOGLE_MAPS
    },
    mapConfig() {
      return {
        zoom: 5,
        center: { lat: -12.03600510418158, lng: -77.04066137432721 }, //lIMA
      }
    },
    mapCenter() {
      return this.markers[1].position
    },

    getMarkers() {
      let markers = this.getFilteredManaged.map((el) => ({
        ...el,
        position: {
          lat: Number(el.clientLatitude),
          lng: Number(el.clientLongitude),
        },
      }))
      return markers
    },
  },
}
</script>

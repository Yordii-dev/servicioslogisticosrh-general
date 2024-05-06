<template>
  <div class="container-map">
    <div class="my-2">
      <h6 class="my-0">
        {{ 'Resultados obtenidos: ' + results }}
      </h6>
      <small v-if="results > 0" class="mx-1 font-italic"
        >Algunas gestiones no contienen con geolocalizacion</small
      >
    </div>
    <GMapMap
      :center="center"
      :zoom="5"
      map-type-id="terrain"
      style="width: 100%; height: 80vh; flex-grow: 1"
    >
      <GMapCluster :zoomOnClick="true">
        <GMapMarker
          v-for="(marker, index) in getMarkers"
          :key="index"
          :position="marker.position"
          :icon="marker.icon"
          :clickable="true"
          :draggable="false"
          @click="center = marker.position"
        >
          <GMapInfoWindow>
            <div>{{ marker.clientName }} <MyComponent /></div> </GMapInfoWindow
        ></GMapMarker>
      </GMapCluster>
    </GMapMap>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
let deliveredIcon = require('@/assets/markers/delivered.svg')
let partialIcon = require('@/assets/markers/partial.svg')
let notDeliveredIcon = require('@/assets/markers/notDelivered.svg')

export default {
  data() {
    return {
      center: { lat: -12.03600510418158, lng: -77.04066137432721 }, //
    }
  },
  computed: {
    ...mapGetters(['getFilteredManaged']),

    results() {
      return this.getFilteredManaged.length
    },

    getMarkers() {
      let markers = this.getFilteredManaged.map((el) => ({
        ...el,
        position: {
          lat: Number(el.clientLatitude),
          lng: Number(el.clientLongitude),
        },
        icon: this.getIcon(el.status),
      }))
      return markers
    },
  },

  methods: {
    getIcon(status) {
      if (status == 'Entregado') return deliveredIcon
      if (status == 'Entrega Parcial') return partialIcon
      if (status == 'No Entregado') return notDeliveredIcon
    },
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

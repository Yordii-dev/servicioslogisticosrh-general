<template>
  <div class="container-map w-75 d-flex flex-column justify-content-between">
    <h6 class="my-0">
      {{ 'Resultados obtenidos: ' + results }}
    </h6>
    <small v-if="results > 0" class="mx-1 font-italic"
      >Algunas gestiones no contienen con geolocalizacion</small
    >

    <div ref="map" id="map" class="map mt-3"></div>
    <div class="no_coords" v-if="managedWithoutPosition.length > 0">
      <p class="text-warning m-0 my-1">
        <i class="fas fa-exclamation-triangle mr-2"></i>Clientes de gestiones
        sin geolocalizacion
      </p>

      <ul class="list-group">
        <li
          class="list-group-item p-0 d-flex justify-content-between"
          v-for="managed in managedWithoutPosition"
          :key="managed.id"
        >
          <span>{{ managed.clientName }}</span>
          <a :href="'tel:+51' + managed.clientPhone" class="text-primary"
            >Telf: +51 {{ managed.clientPhone }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import { Loader } from 'google-maps'
/* import { Marker } from '@/helpers/marker'
import { Info } from '@/helpers/info'
import { middle } from '@/helpers/middle' */

import { loaderPage } from '@/helpers/loaderPage'

export default {
  props: ['managed'],
  data() {
    return {
      marker: null,
      map: null,
      google: null,
      markers: [],
      managedWithoutPosition: [],
      info: null,
    }
  },
  computed: {
    ...mapState(['filter']),

    ...mapGetters(['getFilteredManaged']),

    results() {
      return this.getFilteredManaged.length
    },
  },

  async mounted() {
    let loader = loaderPage(this.$loading)
    /*AIzaSyA2IbChNdPo9LL9fHzSHIR4oyXH7ZjyPUs */ //Key
    /* AIzaSyCdbC0mLnixshOoaRr_dhP3e9xvhRw2pdU */ //New key
    const loaderMap = new Loader(process.env.VUE_APP_KEY_GOOGLE_MAPS, {})
    this.google = await loaderMap.load()
    console.log('google: ', this.google)

    //Set default loaction
    this.map = new this.google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: { lat: -12.03600510418158, lng: -77.04066137432721 }, //lIMA
    })
    function addMarker(google, map, props) {
      new google.maps.Marker({
        position: props.coords,
        map: map,
        //icon: props.image,
        //title: props.title,
      })
    }

    //set values
    /*   this.marker = Marker(this.google)
    this.info = Info(this.google) */

    //set customers position
    /*     this.setCustomersMarkers(this.getFilteredManaged) */

    //Middle map
    /*     middle(this.markers, this.map, this.google) */
    console.log('managed desde prop: ', this.managed)
    for (const managed of this.managed) {
      if (managed.clientLatitude == 0 || managed.clientLatitude == 0) {
        this.managedWithoutPosition.push(managed)
        continue
      }

      let lat = managed.clientLatitude
      let lng = managed.clientLongitude

      addMarker(this.google, this.map, {
        coords: { lat: Number(lat), lng: Number(lng) },
      })
      /*
      let googleCoord = new this.google.maps.LatLng(
        managed.clientLatitude,
        managed.clientLongitude
      ) */

      /*    let m = this.marker.customer(googleCoord, managed)
      m.setMap(this.map)
      this.info.label(
        m,
        managed.status == 'Entrega Parcial' ? 'P' : managed.status[0]
      )

      this.info.windows(m, {
        name: managed.clientName,
        phone: managed.clientPhone,
        address: managed.clientAddress,
        service_time: managed.serviceTime,
      })

      this.markers.push(m) */
    }
    loader.hide()
  },
  methods: {
    /*     setCustomersMarkers(filteredManaged) {
      for (const managed of filteredManaged) {
        if (managed.clientLatitude == 0 || managed.clientLatitude == 0) {
          this.managedWithoutPosition.push(managed)
          continue
        }

        let googleCoord = new this.google.maps.LatLng(
          managed.clientLatitude,
          managed.clientLongitude
        )

        let m = this.marker.customer(googleCoord, managed)
        m.setMap(this.map)
        this.info.label(
          m,
          managed.status == 'Entrega Parcial' ? 'P' : managed.status[0]
        )

        this.info.windows(m, {
          name: managed.clientName,
          phone: managed.clientPhone,
          address: managed.clientAddress,
          service_time: managed.serviceTime,
        })

        this.markers.push(m)
      }
    }, */
  },
}
</script>
<style scoped>
.container-map {
  height: 80vh;
  width: 100%;
  margin: auto !important;
}
.map {
  flex-grow: 1;
}
.no_coords {
  font-size: 13px;
  height: 80px;
}

.no_coords .list-group {
  font-size: 12px;
  height: 60px;
  overflow-y: auto !important;
}
</style>

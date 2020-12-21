<template>
  <q-page class="q-pa-sm row">
    <div
      id="myMap"
      class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
      style="height: 85vh;width: 50%;"
    />
    <div
      id="pano"
      class="col-lg-6 col-md-6 col-sm-12 col-xs-12"
      style="height: 85vh;width: 50%;"
    />
  </q-page>
</template>

<script>
export default {
  name: 'StreetView',
  data () {
    return {
      mapData: ''
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.mapData = new window.google.maps.Map(document.getElementById('myMap'), {
        center: { lat: 42.345573, lng: -71.098326 },
        zoom: 7
      })
      // eslint-disable-next-line no-new
      new window.google.maps.StreetViewPanorama(
        document.getElementById('pano'),
        {
          position: { lat: 42.345573, lng: -71.098326 },
          pov: {
            heading: 34,
            pitch: 10
          }
        }
      )
    }
  }
}
</script>

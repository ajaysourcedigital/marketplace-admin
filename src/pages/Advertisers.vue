<template>
  <q-page
    class="column no-wrap"
  >
    <advertisers-list
      style="background-color: rgba(236, 240, 241, 1);"
      :full-data="records"
    />
  </q-page>
</template>

<script>
import AdvertisersList from 'components/AdvertisersList.vue'
export default {
  name: 'Advertisers',
  components: {
    AdvertisersList
  },
  data () {
    return {
      records: {
        icon: 'fas fa-chart-line',
        header: 'Advertisers',
        subheader: 'These are people or organizations that have created metacontent that exist within your content'
      }
    }
  }
}
</script>

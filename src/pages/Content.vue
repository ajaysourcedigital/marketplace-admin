<template>
  <q-page class="q-pa-sm">
    <stats :settings="user.settings.admin.metacontent.stats" />
    <list :settings="records" />
  </q-page>
</template>

<script>
import Stats from 'components/Stats.vue'
import List from 'components/List.vue'
const api = 'http://localhost:1337' // 'https://api-dev.sourcesync.io'

export default {
  name: "page-metacontent",
  components: {
    Stats,
    List
  },
  mounted () {
    this.$axios.get(`${api}/distributions`, { headers: { Authorization: `Bearer ${this.user.jwt}` } })
      .then(response => {
        this.records.data = response.data
        this.debug('DATA', response.data)
      })
      .catch(response => {
        this.debug('CRAP', response)
      })
  },
  data() {
    return {
      settings: this.$store.state.app.settings,
      user: this.$store.state.user,
      records: {
        icon: 'fas fa-chart-line',
        header: 'Content',
        subheader: 'Here are your content items within the platform',
        columns: [
          {
            name: 'name',
            label: 'Name',
            field: 'name',
            sortable: true,
            align: 'left',
          },
          {
            name: 'created',
            label: 'Created',
            field: 'created_at',
            sortable: true,
            align: 'left',
          },
          {
            name: 'updated',
            label: 'Updated',
            field: 'updated_at',
            sortable: true,
            align: 'left',
          }
        ],
        data: []
      }
    }
  }
}
</script>

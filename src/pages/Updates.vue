<template>
  <q-page class="q-pa-sm">
    <list :settings="content" />
  </q-page>
</template>

<script>
import List from 'components/List.vue'

export default {
  name: 'PageMetacontent',
  components: {
    List
  },
  mounted () {
    this.$axios.get(`${this.$store.state.system.api.base}/updates/by-app/sourcesync-admin`, { headers: { Authorization: `Bearer ${this.user.jwt}` } })
      .then(response => {
        this.content.data = response.data
        this.debug('DATA', response.data)
      })
      .catch(response => {
        this.debug('CRAP', response)
      })
  },
  data () {
    return {
      settings: this.$store.state.app.settings,
      user: this.$store.state.user,
      content: {
        icon: 'fas fa-chart-line',
        header: 'Recent updates',
        subheader: 'Tap on any update to read about it',
        columns: [
          {
            name: 'name',
            label: 'Name',
            field: 'name',
            sortable: true,
            align: 'left'
          },
          {
            name: 'version',
            label: 'Version',
            field: 'version',
            sortable: true,
            align: 'left'
          },
          {
            name: 'created',
            label: 'Released',
            field: 'published_at',
            sortable: true,
            align: 'left'
          }
        ],
        data: []
      }
    }
  }
}
</script>

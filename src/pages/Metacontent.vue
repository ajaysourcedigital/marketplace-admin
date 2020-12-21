<template>
  <q-page class="q-pa-sm">
    <stats :settings="user.settings.admin.metacontent.stats" />
    <list :settings="metacontent" />
  </q-page>
</template>

<script>
import Stats from 'components/Stats.vue'
import List from 'components/List.vue'

export default {
  name: "page-metacontent",
  components: {
    Stats,
    List
  },
  mounted () {
    this.$axios.get(`${this.$store.state.system.api.base}/activations`, { headers: { Authorization: `Bearer ${this.user.jwt}` } })
      .then(response => {
        this.metacontent.data = response.data
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
      metacontent: {
        icon: 'fas fa-chart-line',
        header: 'Metacontent',
        subheader: 'These items can appear within your content in various ways',
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

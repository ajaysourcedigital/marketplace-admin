<template>
  <q-page class="q-pa-sm">
    <stats :settings="user.settings.admin.metacontent.stats" />
    <list
      :data="metacontent.data"
      :schema="schema"
      :full-data="metacontent"
    />
  </q-page>
</template>

<script>
import Stats from 'components/Stats.vue'
import List from 'components/List.vue'

export default {
  name: 'PageMetacontent',
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
  data () {
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
            align: 'left'
          },
          {
            name: 'created',
            label: 'Created',
            field: 'created_at',
            sortable: true,
            align: 'left'
          },
          {
            name: 'updated',
            label: 'Updated',
            field: 'updated_at',
            sortable: true,
            align: 'left'
          }
        ],
        data: []
      },
      // Remove later if needed
      schema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string'
          }
        }
      }
    }
  }
}
</script>

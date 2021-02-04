<template>
  <q-page
    class="q-pa-sm column no-wrap"
    style="background-color: rgb(255, 255, 255)"
  >
    <!-- <stats :settings="user.settings.admin.metacontent.stats" /> -->
    <!-- <list
      :settings="records"
      @row-click="rowClick"
      :data="records.data"
      :schema="schema"
      :full-data="records"
    /> -->
    <metacontent-list
      :settings="records"
      @row-click="rowClick"
      :data="records.data"
      :schema="schema"
      :full-data="records"
    />
  </q-page>
</template>

<script>
// import Stats from 'components/Stats.vue'
// import List from 'components/List.vue'
import MetacontentList from 'components/MetacontentList.vue'
export default {
  name: 'PageMetacontent',
  components: {
    // Stats,
    // List
    MetacontentList
  },
  mounted () {
    this.$api.get('/activations')
      .then(response => {
        this.records.data = response.data
        this.debug('DATA', response.data)
      })
      .catch(response => {
        this.debug('CRAP', response)
      })
  },
  methods: {
    rowClick (ev, row, index) {
      this.debug('Row', ev)
      const { id } = row
      if (!id) throw new Error('`id` is required.')
      this.$router.push({ name: 'edit-metacontent', params: { id } })
    }
  },
  data () {
    return {
      settings: this.$store.state.app.settings,
      user: this.$store.state.user,
      records: {
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

<template>
  <q-page class="q-pa-sm">
    <stats :settings="user.settings.admin.metacontent.stats" />
    <list
      :settings="records"
      @row-click="rowClick"
    />
  </q-page>
</template>

<script>
import Stats from 'components/Stats.vue'
import List from 'components/List.vue'

export default {
  name: 'PageContent',
  components: {
    Stats,
    List
  },
  mounted () {
    this.$api.get('/distributions')
      .then(response => {
        this.records.data = response.data
        this.debug('DATA', response.data)
      })
      .catch(response => {
        this.debug('CRAP', response)
      })
  },
  methods: {
    rowClick (ev, row = {}) {
      const { id } = row
      if (!id) throw new Error('`id` is required.')
      this.$router.push({ name: 'edit-content', params: { id } })
    }
  },
  data () {
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
      }
    }
  }
}
</script>

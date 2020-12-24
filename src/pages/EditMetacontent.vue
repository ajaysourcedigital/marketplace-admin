<template>
  <q-page class="q-pa-sm">
    <div v-if="content">
      <!-- The header -->
      <q-item class="q-pa-none q-pa-sm rounded-borders">
        <q-item-section class="text-h6 text-weight-bolder text-color">
          Editing "{{ content.name }}"
        </q-item-section>
        <q-item-section avatar>
          <dropdown :settings="dropdownMetacontent" />
        </q-item-section>
      </q-item>

      <!-- The split-view -->
      <q-splitter
        v-model="splitterModel"
        :style="`min-height: ${getHeight}`"
      >
        <template v-slot:before>
          <!-- The left side (Settings & Smart Block list) -->
          <edit-metacontent />
        </template>

        <template v-slot:after>
          <!-- The right side (sandbox/production/data view) -->
          <preview-metacontent />
        </template>
      </q-splitter>
    </div>
    <!-- The load screen -->
    <inner-loading :showing="content === null" />
    <!-- Keeps the split-view sized correctly - TODO: Anyone know of a better solution? -->
    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import Dropdown from 'components/Dropdown'
import InnerLoading from 'components/InnerLoading'
import EditMetacontent from 'components/Metacontent/EditMetacontent'
import PreviewMetacontent from 'components/Metacontent/PreviewMetacontent'

export default {
  name: 'PageEditMetacontent',
  components: {
    Dropdown,
    InnerLoading,
    EditMetacontent,
    PreviewMetacontent
  },
  props: {
    id: [String, Number]
  },
  data () {
    return {
      content: null,
      splitterModel: 50,
      size: {},
      dropdownMetacontent: [
        { text: 'Save', action: 'app.editMetacontent.save', payload: '' },
        { text: 'Import', action: 'app.editMetacontent.import', payload: '' },
        { text: 'Export', action: 'app.editMetacontent.export', payload: '' }
      ]
    }
  },
  async created () {
    try {
      const { data } = await this.$api(`/activations/${this.id}`)
      this.content = data
    } catch (e) {
      console.error('Error occurred while fetching data.', e)
    }
  },
  methods: {
    processChange (data) {
      this.debug('Changed', data)
      this.$q.notify(`Recieved data: ${JSON.stringify(data)}`)
    },
    processAction (data) {
      this.debug('Action', data)
      this.$q.notify(`Recieved action with payload: ${JSON.stringify(data)}`)
    },
    onResize (size) {
      console.log(size)
      this.size = size
    }
  },
  computed: {
    getHeight () {
      return this.size.height - 90 + 'px'
    }
  }
}
</script>

<template>
  <q-page
    class="q-pa-sm"
    style="background-color: rgba(236, 240, 241, 1);"
  >
    <div v-if="content">
      <!-- The header -->
      <q-item class="q-pa-none q-px-md rounded-borders">
        <q-item-section class="text-h5 text-weight-bold text-color">
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
          <edit-metacontent
            :log="eventLog"
            :settings="content"
          />
        </template>

        <template v-slot:after>
          <!-- The right side (sandbox/production/data view) -->
          <preview-metacontent
            :settings="content"
            :height="getHeight"
            @action="processAction"
            @change="processChange"
            @config="processConfig"
          />
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
      eventLog: [],
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
    processAction (index, data) {
      this.debug('Action', data)
      this.eventLog.push({ name: 'action', index, data })
      this.$q.notify(`Action: ${JSON.stringify(data)}`)
    },
    processChange (index, data) {
      this.debug('Change', data)
      this.eventLog.push({ name: 'change', index, data })
      this.$q.notify(`Change: ${JSON.stringify(data)}`)
    },
    processConfig (index, data) {
      this.debug('Config', data)
      this.eventLog.push({ name: 'config', index, data })
      this.$q.notify(`Config: ${JSON.stringify(data)}`)
    },
    onResize (size) {
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

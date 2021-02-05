<template>
  <div class="q-pa-xs">
    <q-toolbar
      style="border-radius: 8px;"
      :class="`bg-primary text-white`"
    >
      Metacontent
      <q-space />
      <q-tabs
        v-model="currentTab"
        shrink
      >
        <q-tab
          name="Data"
          label="Data"
        />
        <q-tab
          name="SmartBlocks"
          label="Blocks"
        />
        <q-tab
          name="Events"
          label="Events"
        />
      </q-tabs>
    </q-toolbar>
    <q-tab-panels
      v-model="currentTab"
      animated
      transition-prev="fade"
      transition-next="fade"
    >
      <q-tab-panel
        name="SmartBlocks"
        style="margin:0px;padding:0px"
      >
        Don't see functionality you need?
        <list-smart-blocks />
      </q-tab-panel>
      <q-tab-panel
        name="Data"
        style="margin:0px;padding:0px"
      >
        <data-editor :settings="settings" />
      </q-tab-panel>
      <q-tab-panel name="Events">
        This is a list of events that were triggered while engaging with the
        metacontent. Use this to make sure everything is working as planned.
        <event-log :log="log" />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import ListSmartBlocks from 'components/Metacontent/ListSmartBlocks'
import EventLog from 'components/Metacontent/EventLog'
import DataEditor from 'components/Metacontent/DataEditor'

export default {
  name: 'EditMetacontent',
  props: {
    settings: Object,
    log: Array
  },
  components: {
    ListSmartBlocks,
    EventLog,
    DataEditor
  },
  methods: {
    processSaveMetacontent () {
      this.debug('Saving Metacontent...')
    },
    processChange (data) {
      this.debug('change', data)
      this.$emit('change', data)
    },
    processConfig (index, data) {
      this.debug('config', data)
    },
    processAction (data) {
      this.$emit('action', data)
    },
    processDelete (index) {
      this.debug('Delete', index)
    }
  },
  data () {
    return {
      currentTab: 'Data',
      content: null
    }
  }
}
</script>

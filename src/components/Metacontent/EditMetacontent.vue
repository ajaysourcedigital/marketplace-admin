<template>
  <div
    style="background-color: rgba(236, 240, 241, 1);"
    class="q-pa-xs"
  >
    <q-toolbar
      style="border-radius: 8px;"
      :class="`text-grey-10`"
    >
      <div
        class="text-h6"
      >
        Metacontent
      </div>
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
      style="background-color: rgba(236, 240, 241, 1);"
      transition-prev="fade"
      transition-next="fade"
    >
      <q-tab-panel
        name="SmartBlocks"
        class="fit"
        style="margin-top:5px;padding:0px; background-color: rgba(236, 240, 241, 1); border-radius: 8px;"
      >
        <list-smart-blocks />
      </q-tab-panel>
      <q-tab-panel
        name="Data"
        style="margin-top:5px;padding:0px; background-color: rgba(236, 240, 241, 1); border-radius: 8px;"
      >
        <q-card
          style="margin-top:10px;padding:0px; border-radius: 8px;"
          class="q-ma-md bg-grey-2"
        >
          <data-editor
            class="q-pa-md"
            :settings="settings"
          />
        </q-card>
      </q-tab-panel>
      <q-tab-panel
        name="Events"
        style="margin-top:0px;padding:0px; background-color: rgba(236, 240, 241, 1); border-radius: 8px;"
      >
        <div class="q-pa-md">
          <div class="q-pa-md text-subtitle2">
            This is a list of events that were triggered while engaging with the
            metacontent. Use this to make sure everything is working as planned.
          </div>
          <q-card
            style="border-radius: 8px;"
            class="bg-grey-2 q-mx-md"
          >
            <event-log :log="log" />
          </q-card>
        </div>
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

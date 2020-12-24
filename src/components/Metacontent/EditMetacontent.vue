<template>
  <div class="q-pa-xs">
    <q-toolbar :class="`bg-primary text-white`">
      {{ currentTab }}
      <q-space />
      <q-tabs
        v-model="currentTab"
        shrink
      >
        <q-tab
          name="SmartBlocks"
          label="Smart Blocks"
        />
        <q-tab
          name="Settings"
          label="Settings"
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
      swipeable
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
        name="Settings"
        style="margin:0px;padding:0px"
      >
        Settings go here
      </q-tab-panel>
      <q-tab-panel name="Events">
        This is a list of events that were triggered while engaging with the
        metacontent. Use this to make sure everything is working as planned.
        {{ settings }}
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import ListSmartBlocks from 'components/Metacontent/ListSmartBlocks'

export default {
  name: 'EditMetacontent',
  props: {
    settings: Object
  },
  components: {
    ListSmartBlocks
  },
  methods: {
    processSaveMetacontent () {
      this.debug('Saving Metacontent...')
    },
    processChange (data) {
      this.$emit('action', data)
    },
    processConfig (index, data) {
      this.debug(`Got new config for ${index}`, data)
      this.metacontentBlocks[index].settings = JSON.parse(data)
    },
    processAction (data) {
      this.$emit('change', data)
    },
    processDelete (index) {
      this.debug('Delete', index)
      this.metacontentBlocks.splice(index, 1)
    }
  },
  data () {
    return {
      currentTab: 'SmartBlocks',
      content: null,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      },
      metacontentBlocks: []
    }
  }
}
</script>

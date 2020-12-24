<template>
  <div class="q-pa-xs">
    <q-toolbar :class="`bg-primary text-white`">
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
        Data goes here
      </q-tab-panel>
      <q-tab-panel name="Events">
        This is a list of events that were triggered while engaging with the
        metacontent. Use this to make sure everything is working as planned.
        <q-list
          bordered
          padding
        >
          <q-item
            v-for="(item, index) in log.slice().reverse()"
            :key="index"
          >
            <q-item-section>
              <q-item-label>
                {{ item.name }}
              </q-item-label>
              <q-item-label caption>
                {{ item }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              side
              top
            >
              <q-item-label caption>
                {{ item.index }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import ListSmartBlocks from 'components/Metacontent/ListSmartBlocks'

export default {
  name: 'EditMetacontent',
  props: {
    settings: Object,
    log: Array
  },
  components: {
    ListSmartBlocks
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
      this.metacontentBlocks[index].settings = JSON.parse(data)
    },
    processAction (data) {
      this.$emit('action', data)
    },
    processDelete (index) {
      this.debug('Delete', index)
      this.metacontentBlocks.splice(index, 1)
    }
  },
  data () {
    return {
      currentTab: 'Data',
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

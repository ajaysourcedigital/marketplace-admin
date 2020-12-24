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
          name="Sandbox"
          label="Sandbox"
        />
        <q-tab
          name="Production"
          label="Production"
        />
        <q-tab
          name="Data"
          label="Data"
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
        name="Sandbox"
        style="margin:0px;padding:0px"
      >
        <draggable
          class="list-group"
          :list="metacontentBlocks"
          group="options"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <div
            v-for="(item, index) in metacontentBlocks"
            :key="index"
          >
            <render-smart-block
              :settings="item"
              :preview="true"
              @action="processAction(index, ...arguments)"
              @change="processChange(index, ...arguments)"
              @config="processConfig(index, ...arguments)"
              @delete="processDelete(index, ...arguments)"
            />
          </div>
          <!-- {{ metacontentBlocks }} -->
        </draggable>
      </q-tab-panel>
      <q-tab-panel
        name="Production"
        style="margin:0px;padding:0px"
      >
        <div
          v-for="(item, index) in metacontentBlocks"
          :key="index"
        >
          <render-smart-block
            :settings="item"
            @action="processAction(index, ...arguments)"
            @change="processChange(index, ...arguments)"
            @config="processConfig(index, ...arguments)"
            @delete="processDelete(index, ...arguments)"
          />
        </div>
        <!-- {{ metacontentBlocks }} -->
      </q-tab-panel>
      <q-tab-panel name="Data">
        {{ settings }}
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import RenderSmartBlock from 'components/Metacontent/RenderSmartBlock'

export default {
  name: 'PreviewMetacontent',
  props: {
    settings: Object
  },
  components: {
    Draggable,
    RenderSmartBlock
  },
  methods: {
    processSaveMetacontent () {
      this.debug('Saving Metacontent...')
    },
    processAction (index, data) {
      this.$emit('change', index, data)
    },
    processChange (index, data) {
      this.$emit('action', index, data)
    },
    processConfig (index, data) {
      this.debug('config', index, data, this.metacontentBlocks[index].settings)
      this.metacontentBlocks[index].settings.settings = data
    },
    processDelete (index) {
      this.debug('Delete', index)
      this.metacontentBlocks.splice(index, 1)
    }
  },
  data () {
    return {
      currentTab: 'Sandbox',
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

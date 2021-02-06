<template>
  <div
    class="q-pa-xs"
    :style="`height:${height}!important;`"
  >
    <q-toolbar
      style="border-radius: 8px;"
      :class="`text-grey-10`"
    >
      <div class="text-h6">
        Template
      </div>
      <q-space />
      <q-tabs
        v-model="currentTab"
        shrink
      >
        <q-tab
          name="Template"
          label="Template"
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
      :style="`height:calc(${height} - 55px); background-color: rgba(236, 240, 241, 1);`"
      v-model="currentTab"
      animated
      transition-prev="fade"
      transition-next="fade"
      keep-alive
      :keep-alive-include="['Template']"
    >
      <q-tab-panel
        class="fit"
        name="Template"
        style="margin-top:25px;padding:0px; background-color: rgba(255, 255, 255, 0.0); border-radius: 8px;"
      >
        <draggable
          class="list-group fit q-pt-xs"
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
              style="border-radius: 8px;"
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
        style="margin-top:20px;padding:5px; background-color: rgba(255,255,255, 0.8); border-radius: 8px;"
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
      </q-tab-panel>
      <q-tab-panel
        name="Data"
        style="margin-top:5px;padding:0px; background-color: rgba(236, 240, 241, 1); border-radius: 8px;"
      >
        <q-card
          style="margin-top:10px;padding:5px; border-radius: 8px;"
          class="q-ma-md bg-grey-2"
        >
          <vue-json-pretty
            class="q-ma-md"
            :data="metacontentBlocks"
            :deep="2"
          />
        </q-card>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import VueJsonPretty from 'vue-json-pretty'
import RenderSmartBlock from 'components/Metacontent/RenderSmartBlock'

export default {
  name: 'PreviewMetacontent',
  props: {
    settings: Object,
    height: String
  },
  components: {
    Draggable,
    VueJsonPretty,
    RenderSmartBlock
  },
  methods: {
    processAction (index, data) {
      this.debug('action', index, data)
      this.$emit('action', index, data, this.metacontentBlocks)
    },
    processChange (index, data) {
      this.debug('change', index, data)
      this.$emit('change', index, data, this.metacontentBlocks)
    },
    processConfig (index, data) {
      this.$emit('config', index, data, this.metacontentBlocks)
      this.debug('config', index, data, this.metacontentBlocks[index].settings)
      this.metacontentBlocks[index].settings = data
    },
    processDelete (index) {
      this.debug('Delete', index)
      this.metacontentBlocks.splice(index, 1)
    }
  },
  data () {
    return {
      currentTab: 'Template',
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

<template>
  <div class="q-pa-xs">
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
        <preview-smart-block
          :settings="item"
          @delete="processDelete(index)"
          @config="processConfig(index, $event)"
        />
      </div>
      <!-- {{ metacontentBlocks }} -->
    </draggable>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import PreviewSmartBlock from 'components/Metacontent/PreviewSmartBlock'

export default {
  name: 'MetacontentPreview',
  props: {
    settings: Object
  },
  components: {
    Draggable,
    PreviewSmartBlock
  },
  methods: {
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

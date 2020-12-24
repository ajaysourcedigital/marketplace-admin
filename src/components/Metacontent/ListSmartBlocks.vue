<template>
  <div class="q-pa-xs">
    <div class="q-gutter-sm q-pa-md">
      <draggable
        class="list-group"
        :list="content"
        :group="{ name: 'options', pull: 'clone', put: false }"
        :clone="handleClone"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <describe-smart-block
          v-for="(item, index) in content"
          :key="index"
          :settings="item"
        />
      </draggable>
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import DescribeSmartBlock from 'components/Metacontent/DescribeSmartBlock'
export default {
  name: 'ListSmartBlocks',
  props: {
    settings: Object
  },
  components: {
    Draggable,
    DescribeSmartBlock
  },
  async created () {
    try {
      const { data } = await this.$api('/apps?type=Activation')
      this.content = data
    } catch (e) {
      console.error('Error occurred while fetching data.', e)
    }
  },

  methods: {
    onChange (value) {
      this.model = value
    },
    onChangeState (value) {
      this.state = value
    },
    onValidated (value) {
      this.valid = value
    },
    // Called whenever you drag/drop something into the sandbox
    handleClone (obj) {
      // We only want to clone app.settings...
      const clone = this.$ee.util.clone(obj.settings)
      // Initialize defaults if they exist...
      if (clone.default) {
        clone.settings = clone.default
        delete clone.default
      }
      return clone
    }
  },
  data () {
    return {
      content: [],
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>

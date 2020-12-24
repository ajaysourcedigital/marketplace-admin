<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this.
      <q-input
        label="Content"
        :value="settings.content"
      />
    </div>
    <div v-else>
      Your Markdown goes here.
    </div>
  </div>
</template>
<script>
export default {
  name: 'SmartBlockMarkdown',
  props: {
    settings: Object,
    configure: Boolean
  },
  methods: {
    emitAction () {
      this.$emit('action', 'Clicked')
    },
    emitConfig (data) {
      const emit = JSON.parse(JSON.stringify(this.settings))
      emit.image = data
      this.$emit('config', JSON.stringify(emit))
    }
  }
}
</script>

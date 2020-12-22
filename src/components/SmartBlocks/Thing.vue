<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this thing by dragging a URL from your favorite website, i.e. wikipedia.
      <q-input
        label="URL"
        :value="settings.url"
      />
    </div>
    <div v-else>
      Your thing template goes here.
    </div>
  </div>
</template>
<script>
export default {
  name: 'SmartBlockThing',
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

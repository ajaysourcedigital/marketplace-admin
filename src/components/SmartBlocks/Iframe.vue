<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this iframe by dragging a URL from your favorite website.
      <q-input
        label="URL"
        :value="settings.url"
        @input='emitConfig'
        clearable
        clear-icon="close"
      />
    </div>
    <div v-else>
      <iframe
        :src='settings.url'
        v-if='settings.url'
        class='fit q-pa-sm'
        frameBorder='0'
      />
      <div v-else>Your iframe goes here.</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SmartBlockIframe',
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
      emit.url = data
      this.$emit('config', emit)
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Choose the app you would like to load...
      <q-input
        label="App URL"
        :value="settings.url"
      />
      <q-input
        label="Auth Token (optional)"
        :value="settings.token"
      />
    </div>
    <div v-else>
      Your app would go here
    </div>
  </div>
</template>
<script>
export default {
  name: 'SmartBlockApp',
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

<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Name your action.
      <q-input
        label="URL"
        :value="settings.name"
      />
    </div>
    <q-btn
      v-else
      label="Action"
      class="full-width"
      @click="emitAction"
    />
  </div>
</template>
<script>
export default {
  name: 'SmartBlockButton',
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

<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this ad by entering the advertizers API and campaign.
      <q-input label="Provider API" />
      <q-input label="Campaign ID" />
      <q-input label="Image URL (optional)" />
    </div>
    <img
      v-else
      width="100%"
      :src="settings.image"
      @click="emitAction"
    >
  </div>
</template>
<script>
export default {
  name: 'SmartBlockAd',
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
      this.$emit('config', emit)
    }
  }
}
</script>

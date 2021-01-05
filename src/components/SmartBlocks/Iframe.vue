<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this iframe by pasting a URL from your favorite website.
      <q-input
        label="URL"
        ref="input"
        v-model="settings.url"
        clearable
        clear-icon="close"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="check"
            @click="emitConfig"
          />
        </template>
      </q-input>
    </div>
    <div v-else>
      <iframe
        :src='settings.url'
        v-if='settings.url'
        class='fit q-pa-sm'
        frameBorder='0'
      />
      <div v-else>Your iframe will appear here.</div>
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
    emitConfig () {
      this.debug(this.$refs.input.value)
      const data = this.$refs.input.value
      if (data) {
        const emit = JSON.parse(JSON.stringify(this.settings))
        emit.url = data
        this.$emit('config', emit)
      }
    }
  }
}
</script>

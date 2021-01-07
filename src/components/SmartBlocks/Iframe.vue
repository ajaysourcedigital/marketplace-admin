<template>
  <div class="fit">
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this iframe by pasting a URL from your favorite website.
      <q-input
        v-for="con in conf"
        :key="con.label"
        :label="con.label"
        v-model="temp[con.model]"
        clearable
        clear-icon="close"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            flat
            icon="check"
            @click="emitConfig(con.model)"
          />
        </template>
      </q-input>
    </div>
    <div
      v-else
      class="fit"
    >
      <iframe
        :src='settings.url'
        v-if='settings.url'
        class='fit'
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
  data () {
    return {
      temp: { ...this.settings },
      conf: [
        { label: 'Url', model: 'url' },
        { label: 'Height', model: 'height' }
      ]
    }
  },
  methods: {
    emitAction () {
      this.$emit('action', 'Clicked')
    },
    emitConfig (model) {
      const emit = JSON.parse(JSON.stringify(this.settings))
      emit[model] = this.temp[model]
      this.$emit('config', emit)
    }
  }
}
</script>

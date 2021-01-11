<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm q-gutter-y-sm"
    >
      <div>
        Choose the app you would like to load.
      </div>
      <q-select
        :loading="!appOptions"
        label="App URL"
        :options="appOptions"
        option-label="name"
        option-value="slug"
        :value="settings.slug"
        emit-value
        map-options
        @input="updateConfig($event, 'slug')"
      />
      <q-input
        label="Minimum Height"
        :value="settings.style ? settings.style.minHeight : null"
        @input="updateConfig($event, 'style.minHeight')"
      />
      <v-jsoneditor
        :value="settings.settings"
        :options="{
          mode: 'code',
        }"
        @input="updateConfig($event, 'settings')"
      />
    </div>
    <div v-else>
      <iframe
        :src="url"
        v-if="url"
        class="fit q-pa-sm"
        :style="style"
        frameBorder="0"
      />
      <div v-else>
        Your app will appear here.
      </div>
    </div>
  </div>
</template>
<script>
import VJsoneditor from 'v-jsoneditor'
import set from 'lodash/set'
export default {
  name: 'SmartBlockApp',
  components: {
    VJsoneditor
  },
  props: {
    settings: Object,
    configure: Boolean
  },
  data () {
    return {
      appOptions: null
    }
  },
  async created () {
    const { data } = await this.$api.get('apps', { params: { type: 'Activation' } })
    this.appOptions = data
  },
  computed: {
    url () {
      if (!this.settings || !this.settings.slug) return null
      let url = `https://apps.sourcesync.io/${encodeURIComponent(this.settings.slug)}/`
      if (this.settings.settings) url += `?settings=${encodeURIComponent(JSON.stringify(this.settings.settings))}`
      return url
    },
    style () {
      if (!this.settings || !this.settings.style) return {}
      return this.settings.style
    }
  },
  methods: {
    updateConfig (value, prop) {
      this.$emit('config', set({ ...this.settings }, prop, value))
    }
  }
}
</script>

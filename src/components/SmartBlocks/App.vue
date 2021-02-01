<template>
  <div>
    <q-form
      v-if="configure"
      @submit="emitConfig"
      class="q-pa-sm q-gutter-y-sm"
    >
      <div>
        Choose the app you would like to load.
      </div>
      <q-select
        :loading="!appOptions"
        label="App *"
        required
        :options="appOptions"
        option-label="name"
        option-value="slug"
        clearable
        v-model="internalSettings.slug"
        emit-value
        map-options
      />
      <q-input
        label="Minimum Height"
        clearable
        v-model="internalSettings.style.minHeight"
      />
      <q-field :rules="[() => !settingsHasError]">
        <v-jsoneditor
          :value="internalSettings.settings"
          @input="onSettingsInput"
          :options="{
            mode: 'code',
          }"
          @error="onSettingsError"
        />
      </q-field>
      <div class="text-right">
        <q-btn
          color="primary"
          label="Save"
          type="submit"
        />
      </div>
    </q-form>
    <div v-else>
      <iframe
        :src="url"
        v-if="url"
        class="fit q-pa-sm"
        :style="internalSettings.style"
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
import clonedeep from 'lodash/cloneDeep'
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
      appOptions: null,
      internalSettings: null,
      settingsHasError: false
    }
  },
  async created () {
    this.internalSettings = Object.assign({ style: {} }, clonedeep(this.settings))
    const { data } = await this.$api.get('apps', { params: { type: 'Activation' } })
    this.appOptions = data
  },
  computed: {
    url () {
      if (!this.internalSettings || !this.internalSettings.slug) return null
      let url = `https://apps.sourcesync.io/${encodeURIComponent(this.settings.slug)}/`
      if (this.internalSettings.settings) url += `?settings=${encodeURIComponent(JSON.stringify(this.internalSettings.settings))}`
      return url
    }
  },
  methods: {
    onSettingsError () {
      this.settingsHasError = true
    },
    onSettingsInput ($event) {
      this.settingsHasError = false
      this.internalSettings.settings = $event
    },
    emitConfig () {
      this.$emit('config', this.internalSettings)
    },
    updateConfig (value, prop) {
      set(this.internalSettings, prop, value)
    }
  }
}
</script>

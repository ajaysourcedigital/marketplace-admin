<template>
  <div class="fit">
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Configure this iframe by pasting a URL from your favorite website.
      <q-form
        @submit="emitConfig"
        @reset="reset"
        class="q-gutter-sm q-pa-md"
      >
        <q-input
          label="Url"
          v-model="temp.url"
          clearable
          clear-icon="close"
        />
        <q-input
          label="Height"
          v-model="temp.style.minHeight"
          clearable
          clear-icon="close"
        />
        <div class="full-width row justify-end q-pt-md">
          <q-btn
            type="submit"
            color="primary"
            label='Save'
          />
          <q-btn
            type="reset"
            label='Reset'
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <div
      v-else
      class="fit"
    >
      <iframe
        :src='settings.url'
        v-if='settings.url'
        class='full-width'
        :height="settings.style.minHeight"
        frameBorder='0'
      />
      <div v-else>Your iframe will appear here.</div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
export default {
  name: 'SmartBlockIframe',
  props: {
    settings: Object,
    configure: Boolean
  },
  data () {
    return {
      temp: clonedeep(this.settings)
    }
  },
  methods: {
    emitAction () {
      this.$emit('action', 'Clicked')
    },
    emitConfig () {
      const emit = JSON.parse(JSON.stringify(this.temp))
      this.$emit('config', emit)
    },
    reset () {
      this.temp = clonedeep(this.settings)
    }
  }
}
</script>

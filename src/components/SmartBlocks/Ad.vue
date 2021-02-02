<template>
  <div>
    <q-form
      v-if="configure"
      @submit="emitConfig"
      class="q-pa-sm q-gutter-y-sm"
    >
      <div>
        Configure this ad by entering the advertizers API and campaign.
      </div>
      <q-input
        label="Publisher ID *"
        hide-bottom-space
        v-model="internalSettings.advangelists.pubId"
        :rules="[$rules.required]"
      />
      <q-input
        label="Width *"
        type="number"
        hide-bottom-space
        v-model="internalSettings.width"
        :rules="[val => val === 0 || $rules.required(val)]"
      />
      <q-input
        label="Height *"
        type="number"
        hide-bottom-space
        v-model="internalSettings.height"
        :rules="[val => val === 0 || $rules.required(val)]"
      />
      <q-select
        label="IAB Categories"
        :options="catsOpts"
        :loading="!iabOptions"
        :disabled="!iabOptions"
        @filter="catsFilterFn"
        clearable
        multiple
        use-input
        options-selected-class="text-secondary text-bold"
        use-chips
        emit-value
        map-options
        v-model="internalSettings.cats"
      />
      <q-select
        label="Blocked IAB Categories"
        :options="bcatOpts"
        :loading="!iabOptions"
        :disabled="!iabOptions"
        @filter="bcatFilterFn"
        clearable
        options-selected-class="text-secondary text-bold"
        multiple
        use-chips
        emit-value
        use-input
        map-options
        v-model="internalSettings.bcat"
      />
      <div class="row justify-end">
        <q-btn
          color="primary"
          type="submit"
          label="Save"
        />
      </div>
    </q-form>
    <div v-else>
      <smart-block-ad
        :settings="internalSettings"
        :test-mode="true"
        :error.sync="error"
        @render="onRender"
      />
      <div v-if="error">
        <q-banner class="text-white bg-red">
          Sorry, we could not render your ad. Please ensure properties such as "Publisher ID", "Width" and "Height" are correctly entered.
        </q-banner>
      </div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash/cloneDeep'
let iabOptions
export default {
  name: 'SmartBlockAdEditor',
  components: {
    SmartBlockAd: () => import(/* webpackChunkName: "smart-block-ad" */ './SmartBlockAd.vue')
  },
  props: {
    settings: Object,
    configure: Boolean
  },
  data () {
    return {
      internalSettings: null,
      error: null,
      iabOptions: null,
      bcatOpts: null,
      catsOpts: null
    }
  },
  async created () {
    this.internalSettings = Object.assign({ advangelists: {}, width: 320, height: 250 }, clonedeep(this.settings))
    if (!iabOptions) {
      iabOptions = await import('assets/iad_categories.json')
        .then(module => module.default.map(({ value, label }) => ({ value, label: `[${value}] ${label}` })))
    }
    this.iabOptions = iabOptions
    this.bcatOpts = iabOptions
  },
  methods: {
    emitConfig (value, prop) {
      this.$emit('config', this.internalSettings)
    },
    onRender (args) {
      this.debug('rendering ad...', args)
    },
    filterFn (optName, val, update, abort) {
      update(() => {
        if (!val) {
          this[optName] = iabOptions
        } else {
          const needle = val.toLowerCase()
          this[optName] = iabOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1 || v.value.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    bcatFilterFn (val, update, abort) {
      this.filterFn('bcatOpts', val, update, abort)
    },
    catsFilterFn (val, update, abort) {
      this.filterFn('catsOpts', val, update, abort)
    }
  }
}
</script>

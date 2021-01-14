<template>
  <div class="fit overflow-hidden">
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      <div class="row full-width justify-between q-pt-sm q-px-md">
        <div>Configure this.</div>
        <q-toggle
          v-model="sale"
          left-label
          dense
          label="Add sale price"
        />
      </div>
      <q-form
        @submit="emitConfig"
        @reset="reset"
        class="q-gutter-sm q-pa-md"
      >
        <div
          v-for="con in conf"
          :key="con.label"
        >
          <q-input
            v-if="con.model !== 'lowPrice'"
            :label="con.label"
            v-model="temp[con.model]"
            :rules="[val => rule(val, con.required)]"
            clearable
            clear-icon="close"
            :type="inputType(con.model)"
          />
          <q-input
            v-else-if="con.model === 'lowPrice' && sale"
            :label="con.label"
            v-model="temp[con.model]"
            :rules="[val => rule(val, con.required)]"
            clearable
            clear-icon="close"
            :type="inputType(con.model)"
          />
        </div>
        <div class="full-width row justify-end">
          <q-btn
            label="Save"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <div v-else>
      <div
        v-if="settings.title"
        class="q-pa-sm"
      >
        <q-img
          v-if="settings.image"
          :src="settings.image"
          contain
          :ratio="16/7"
        />
        <!-- Name & Price -->
        <div class="text-center">
          <div class="q-mt-md text-subtitle1">{{settings.title}}</div>
          <span
            class="text-strike text-bold"
            v-if="sale"
          >${{settings.highPrice}}</span> Get it for <span class="text-bold">${{ sale ? settings.lowPrice : settings.highPrice }}</span>
        </div>
        <!-- Add to cart -->
        <div class="q-py-sm">
          <q-btn
            label="Add to Cart"
            class="full-width"
            color="primary"
            @click="btnNotif"
          />
        </div>
        <!-- Description -->
        <div
          v-if="settings.description"
          class="text-body1 q-my-sm scroll"
          style="max-height:250px;"
        >
          <div v-html="settings.description"></div>
        </div>
      </div>
      <div v-else>Your product will show here.</div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash/clonedeep'
export default {
  name: 'SmartBlockProduct',
  props: {
    settings: Object,
    configure: Boolean
  },
  data () {
    return {
      sale: !!this.settings.lowPrice,
      temp: clonedeep(this.settings),
      conf: [
        { label: 'Title', required: true, model: 'title' },
        { label: 'Product ID', required: true, model: 'productId' },
        { label: 'Image', required: false, model: 'image' },
        { label: 'Price', required: true, model: 'highPrice' },
        { label: 'Sale Price', required: false, model: 'lowPrice' },
        { label: 'Description', required: false, model: 'description' }
      ]
    }
  },
  watch: {
    'sale' (val) {
      if (!val) this.emitSalePrice()
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
    // only affect low price
    emitSalePrice () {
      const emit = JSON.parse(JSON.stringify(this.settings))
      emit.lowPrice = null
      this.$emit('config', emit)
    },
    rule (val, req) {
      return new Promise((resolve, reject) => {
        if (req) resolve(!!val || '* Required')
        else resolve()
      })
    },
    reset () {
      this.temp = clonedeep(this.settings)
    },
    inputType (model) {
      let type
      switch (model) {
        case 'description':
          type = 'textarea'
          break
        case 'image':
          type = 'url'
          break
        case 'highPrice':
          type = 'number'
          break
        case 'lowPrice':
          type = 'number'
          break
        default:
          type = 'text'
          break
      }
      return type
    },
    btnNotif () {
      this.emitAction()
      this.$q.notify('This would open the cart...')
    }
  }
}
</script>

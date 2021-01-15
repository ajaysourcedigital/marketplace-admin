<template>
  <div class="fit overflow-hidden">
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      <q-form
        @submit="emitConfig"
        @reset="reset"
        greedy
        class="q-gutter-sm"
      >
        <q-field
          borderless
          hide-bottom-space
        >
          <q-toggle
            v-model="sale"
            dense
            label="Add sale price"
          />
        </q-field>
        <div
          v-for="con in conf"
          :key="con.label"
        >
          <q-input
            v-if="con.model !== 'lowPrice' || sale"
            :label="con.label + (con.required ? ' *' : '')"
            v-model="temp[con.model]"
            :rules="[val => !con.required || !!val || '* Required']"
            clearable
            hide-bottom-space
            clear-icon="close"
            :type="inputType(con.model)"
          />
        </div>
        <div class="full-width row justify-end">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Save"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
    <div v-else>
      <div
        v-if="temp.title"
        class="q-pa-sm"
      >
        <q-img
          v-if="temp.image"
          :src="temp.image"
          contain
          :ratio="16/7"
        />
        <!-- Name & Price -->
        <div class="text-center">
          <div class="q-mt-md text-subtitle1">
            {{ temp.title }}
          </div>

          <span v-if="temp.lowPrice">Get it for <span class="text-strike text-bold text-grey">${{ temp.highPrice }}</span>&nbsp;<span class="text-bold text-negative">${{ temp.lowPrice }}</span>
          </span>
          <span v-else>
            Get it for <span class="text-bold">${{ temp.highPrice }}</span>
          </span>
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
          v-if="temp.description"
          class="text-body1 q-my-sm scroll"
          style="max-height:250px;"
        >
          <div v-html="$sanitize(temp.description)" />
        </div>
      </div>
      <div v-else>
        Your product will show here.
      </div>
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
      if (!val) this.temp.lowPrice = null
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
      this.sale = !!this.temp.lowPrice
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

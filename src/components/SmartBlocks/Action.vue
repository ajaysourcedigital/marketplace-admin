<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Customize your action button.
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
            :label="con.label"
            v-model="temp[con.model]"
            clearable
            clear-icon="close"
            type="text"
          >
            <!-- Color Picker -->
            <template
              v-if="con.colorPicker"
              v-slot:append
            >
              <q-icon
                name="colorize"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="temp[con.model]" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="full-width row justify-end">
          <q-btn
            round
            type="submit"
            icon="check"
            color="primary"
          />
          <q-btn
            round
            type="reset"
            icon="close"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
    <q-btn
      v-else
      :label="settings.title"
      class="full-width"
      :style="{
        'background' : settings.color,
        'color' : settings.textColor
      }"
      @click="emitAction"
    />
  </div>
</template>
<script>
export default {
  name: 'SmartBlockAction',
  props: {
    settings: Object,
    configure: Boolean
  },
  data () {
    return {
      temp: { ...this.settings },
      conf: [
        { label: 'Title', model: 'title' },
        { label: 'Url', model: 'url' },
        { label: 'Color', colorPicker: true, model: 'color' },
        { label: 'Text color', colorPicker: true, model: 'textColor' }
      ]
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
      this.temp = { ...this.settings }
    }
  }
}
</script>

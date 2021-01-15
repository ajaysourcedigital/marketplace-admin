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
        class="q-gutter-y-sm"
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

        <div class="text-right">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
          />
          <q-btn
            label="Save"
            type="submit"
            class="q-ml-sm"
            color="primary"
          />
        </div>
      </q-form>
    </div>
    <q-btn
      v-else
      :label="temp.title"
      class="full-width"
      :style="{
        background: temp.color,
        color: temp.textColor,
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

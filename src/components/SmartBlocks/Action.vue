<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      Customize your action button.
      <q-input
        label="Title"
        ref="input"
        v-model="settings.title"
      />
      <q-input
        label="URL"
        v-model="settings.url"
      />
      <q-input
        label="Color"
        v-model="settings.color"
      >
        <template v-slot:append>
          <q-icon
            name="colorize"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="settings.color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        label="Text Color"
        v-model="settings.textColor"
      >
        <template v-slot:append>
          <q-icon
            name="colorize"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color v-model="settings.textColor" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <div class="text-right">
        <q-btn
          dense
          color="primary"
          label="Save"
          class="q-mt-md q-px-md"
          @click="emitConfig"
        />
      </div>
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
  methods: {
    emitAction () {
      this.$emit('action', 'Clicked')
    },
    emitConfig () {
      this.debug(this.$refs.input.value)
      const data = this.$refs.input.value
      if (data) {
        const emit = JSON.parse(JSON.stringify(this.settings))
        emit.title = data
        this.$emit('config', emit)
      }
    }
  }
}
</script>

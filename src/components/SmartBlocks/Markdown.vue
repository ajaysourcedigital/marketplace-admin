<template>
  <div>
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      This component uses <a href="https://stackedit.io/">Markdown</a> to render
      content. Type or paste your markdown in the box below.
      <q-input
        label="Content"
        ref="input"
        v-model="config.content"
        filled
        autogrow
        @blur="emit('change', config)"
      />

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
    <div
      v-else
      v-html="html"
    />
  </div>
</template>
<script>
export default {
  name: 'SmartBlockMarkdown',
  props: {
    settings: Object,
    configure: Boolean
  },
  computed: {
    html () {
      // Process the markdown after we escape the html tags...
      return this.$ee.templates.md.default(this.$ee.templates.html.escape(this.settings.content))
    }
  },
  data () {
    return {
      config: this.$ee.util.clone(this.settings)
    }
  },
  methods: {
    emit (event, data) {
      const cloned = this.$ee.util.clone(data)
      this.debug(event, cloned)
      this.$emit(event, cloned)
    },
    emitConfig () {
      this.debug(this.$refs.input.value)
      const data = this.$refs.input.value
      if (data) {
        const emit = JSON.parse(JSON.stringify(this.settings))
        emit.content = data
        this.$emit('config', emit)
      }
    }
  }
}
</script>

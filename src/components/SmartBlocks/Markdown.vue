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
        v-model="config.content"
        filled
        autogrow
        @input="emitChange"
        @blur="emitConfig"
      />
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
  data () {
    return {
      // Local copy of settings that can be modified
      config: this.settings
    }
  },
  computed: {
    html () {
      // Process the markdown after we escape the html tags...
      return this.$ee.templates.md.default(this.$ee.templates.html.escape(this.settings.content))
    }
  },
  methods: {
    emitAction () {
      this.debug('action', this.config)
      this.$emit('action', 'Clicked')
    },
    emitConfig () {
      this.debug('config', this.config)
      this.$emit('config', this.config)
    },
    emitChange (data) {
      this.debug('change', this.config)
      this.$emit('change', this.config)
    }
  }
}
</script>

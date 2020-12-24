<template>
  <div class="q-pa-xs">
    <vue-json-pretty
      :data="settings"
      :deep="2"
    />
  </div>
</template>
<script>
import VueJsonPretty from 'vue-json-pretty'

export default {
  name: 'MetacontentDataEditor',
  props: {
    settings: Object
  },
  components: {
    VueJsonPretty
  }
}
</script>

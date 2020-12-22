<template>
  <div>
    <q-card
      :class="`full-width q-pa-sm q-ma-sm bg-${settings.settings.color} text-white`"
      size="lg"
    >
      <strong>{{ settings.name }}</strong>
      by {{ settings.publisher.Name }}<br>
      {{ settings.description }}
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'DescribeSmartBlock',
  props: {
    settings: Object
  }
}
</script>

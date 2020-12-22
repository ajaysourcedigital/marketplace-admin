<template>
  <q-page class="q-pa-sm">
    Editing {{ id }}
  </q-page>
</template>

<script>

export default {
  name: 'PageEditCampaign',
  props: {
    id: [String, Number]
  }
}
</script>

<template>
  <div>
    <div
      v-for="item in prop"
      :key="item.col"
      class="q-pa-sm"
    >
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6 text-capitalize q-pb-sm">
            {{ item.col }}:
          </div>
          <div>
            {{ item.val }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    prop: Array
  }
}
</script>

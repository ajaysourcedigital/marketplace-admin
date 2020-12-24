<template>
  <div class="q-pa-xs">
    <q-list
      bordered
      padding
    >
      <q-item
        v-for="(item, index) in log.slice().reverse()"
        :key="index"
      >
        <q-item-section>
          <q-item-label>
            {{ item.name }}
          </q-item-label>
          <q-item-label caption>
            {{ item }}
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
          top
        >
          <q-item-label caption>
            {{ item.index }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>

export default {
  name: 'MetacontentEventLog',
  props: {
    log: Array
  }
}
</script>

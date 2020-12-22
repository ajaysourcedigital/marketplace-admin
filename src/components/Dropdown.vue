<template>
  <q-icon
    name="more_vert"
    class="cursor-pointer"
  >
    <q-menu
      transition-show="fade"
      transition-hide="fade"
    >
      <q-list style="min-width: 100px">
        <q-item
          v-for="(item, index) in settings"
          :key="index"
          clickable
        >
          <q-item-section @click="processAction(item)">
            {{ item.text }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    settings: Array
  },
  methods: {
    processAction (link) {
      this.debug(`Processing action ${link.action} (${link.payload})`)
      this.$bus.emit(link.action, link.payload)
    }
  }
}
</script>

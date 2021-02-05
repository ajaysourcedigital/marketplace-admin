<template>
  <div class="justify-around">
    <q-card
      :class="`col-xs-12 shadow-4 col-sm-auto q-pa-xs q-ma-sm bg-${settings.settings.color} text-white smartblock-card`"
      size="lg"
      style="border-radius: 15px; width: 400px;"
    >
      <q-card-section
        horizontal
        class="items-center q-pa-sm bg-grey-1 text-grey-10 shadow-3"
      >
        <div
          class="bg-white col-auto"
          style="border-radius: 50%;"
        >
          <q-avatar
            size="65px"
            class="shadow-3"
          >
            <q-img
              contain
              class=""
              src="https://storage.googleapis.com/apps.sourcesync.io/dynamic-apps/tempAssets/smart_block_default.jpg"
            />
          </q-avatar>
        </div>
        <div class="col q-ml-md">
          <div class="row">
            <strong>{{ settings.name }}</strong>
            by {{ settings.publisher.Name }}
          </div>
          <div class="row">
            {{ settings.description }}
          </div>
        </div>
      </q-card-section>
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

<style lang="stylus">

.smartblock-card:hover {
  box-shadow: 1px 1px 1px rgba(108, 122, 137, 1)
  bottom: 2px
  right: 2px
}

</style>

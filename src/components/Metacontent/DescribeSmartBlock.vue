<template>
  <div class="flex flex-row flex-center ">
    <q-card
      :class="`col-xs-12 col-sm-10 shadow-4 q-ma-sm bg-${settings.settings.color} text-white smartblock-card`"
      style="border-radius: 8px; width: 80%;"
    >
      <q-card-section
        horizontal
        class="items-center bg-grey-1 text-grey-10 shadow-3"
      >
        <div
          class="bg-white col-auto"
          style="border-radius: 8px;"
        >
          <q-img
            contain
            style="width: 80px; border-radius: 8px;"
            class=""
            src="https://storage.googleapis.com/apps.sourcesync.io/dynamic-apps/tempAssets/smart_block_default.jpg"
          />
        </div>
        <div class="col q-ml-md">
          <div class="row no-wrap">
            <div>
              <strong>{{ settings.name }}</strong>
            </div>
            <div class="q-mx-xs text-body2">
              by {{ settings.publisher.Name }}
            </div>
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

.smartblock-card {
  padding: 2.2px;
}

.smartblock-card:hover {
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.6)
  bottom: 2px
  right: 2px
}

</style>

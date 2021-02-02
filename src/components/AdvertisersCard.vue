<template>
  <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <q-card
      class="content-list__card hide-scrollbar q-pa-sm"
      style="overflow-y: auto"
    >
      <div
        class="column no-wrap justify-between"
        style="height: 100%;"
      >
        <q-card-section class="q-py-sm">
          <div class="col text-h6 ellipsis">
            {{ props.row.userName }}
          </div>
        </q-card-section>
        <div>
          <q-img
            :src="props.row.media"
            style="height: 100px"
            contain
          />
        </div>
        <div>
          <q-card-section
            class="text-bold q-pa-xs"
            style="font-size: 0.775rem;"
          >
            <div class="row justify-between q-mb-xs">
              <div>{{ props.row.items }} items</div>
              <div>{{ props.row.impressions }} impressions</div>
            </div>

            <div class="row justify-between q-mb-xs">
              <div>{{ props.row.contentItems }} content items</div>
              <div>{{ props.row.engagements }} engagements</div>
            </div>

            <div class="row justify-between q-mb-lg">
              <div>{{ props.row.appearences }} appearences</div>
              <div>{{ props.row.actions }} actions</div>
            </div>

            <div class="row justify-between">
              <div>
                <div class="text-center">
                  ${{ props.row.thisMonth }}
                </div>
                <div class="text-caption text-bold">
                  this month
                </div>
              </div>

              <div>
                <div class="text-center">
                  ${{ props.row.allTime }}
                </div>
                <div class="text-caption text-bold">
                  all time
                </div>
              </div>
            </div>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>

export default {
  props: {
    props: { type: Object, default: null }
  }
}
</script>

<style lang="stylus">
.content-list__card {
  height: 350px;
}
</style>

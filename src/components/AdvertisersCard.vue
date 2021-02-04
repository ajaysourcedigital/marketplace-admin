<template>
  <div class="row justify">
    <div class="col-xs-11 col-sm-6 col-md-4 col-lg-3 q-ma-md">
      <q-card
        class="content-list__card hide-scrollbar q-pa-sm"
        style="overflow-y: auto"
      >
        <div
          class="column no-wrap justify-between"
          style="height: 100%;"
        >
          <q-card-section class="q-py-sm">
            <div class="col text-h5 ellipsis">
              {{ props.row.userName }}
              <q-separator class="q-mt-xs" />
            </div>
          </q-card-section>
          <div>
            <q-img
              :src="props.row.media"
              style="height: 65px"
              contain
            />
          </div>
          <div>
            <q-card-section
              class="text-subtitle2 q-pa-xs bg-grey-1 q-pa-sm"
              style="font-size: 0.775rem; border-radius: 8px;"
            >
              <div class="row justify-between q-mb-xs">
                <div v-if="props.row.items">
                  {{ filteredNumber(props.row.items) }} Campaigns
                </div>
                <div v-if="props.row.impressions">
                  {{ filteredNumber(props.row.impressions) }} Impressions
                </div>
              </div>

              <div class="row justify-between q-mb-xs">
                <div v-if="props.row.contentItems">
                  {{ filteredNumber(props.row.contentItems) }} Content Video Plays
                </div>
                <div v-if="props.row.engagements">
                  {{ filteredNumber(props.row.engagements) }} Engagements
                </div>
              </div>

              <div class="row justify-between q-mb-lg">
                <div v-if="props.row.appearences">
                  {{ filteredNumber(props.row.appearences) }} appearences
                </div>
                <div v-if="props.row.actions">
                  {{ filteredNumber(props.row.actions) }} Conversions
                </div>
              </div>

              <div class="row justify-between">
                <div>
                  <div
                    class="text-center"
                    v-if="props.row.thisMonth"
                  >
                    ${{ filteredNumber(props.row.thisMonth) }}
                  </div>
                  <div class="text-caption text-bold">
                    this month
                  </div>
                </div>

                <div>
                  <div
                    class="text-center"
                    v-if="props.row.allTime"
                  >
                    ${{ filteredNumber(props.row.allTime) }}
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
  </div>
</template>

<script>

export default {
  props: {
    props: { type: Object, default: null }
  },
  methods: {
    filteredNumber (value) {
      const ending = ['k', 'm', 'b', 't']
      const n = value
      if (n.length < 4) {
        return n
      } else {
        if (n.length < 7) {
          return (n / 1000) + 'k'
        }
        return `${n[0]}${n[1] !== '0' ? `.${n[1]}` : ''}${ending[Math.floor((n.length - 1) / 3) - 1]}`
      }
      // return '$' + this.props.row.impressions
    }
  }
}
</script>

<style lang="stylus">
.content-list__card {
  height: 350px;
  width: 350px;
}
</style>

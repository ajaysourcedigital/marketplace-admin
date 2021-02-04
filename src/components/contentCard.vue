<template>
  <div class="q-pa-sm col-xs-12 col-sm-6 col-md-6 col-lg-4">
    <q-card
      @click="$emit('row-click', props.row)"
      class="q-pa-xs content-list__card cursor-pointer hide-scrollbar "
      style="overflow-y: auto"
    >
      <q-card-section horizontal>
        <q-card-section class="col-5 q-pa-xs flex flex-center">
          <q-img
            class="rounded-borders"
            v-if="props.row.media"
            :ratio="1"
            :src="`https://img.youtube.com/vi/${props.row.media}/0.jpg`"
          />
          <q-img
            class="rounded-borders"
            v-else
            :ratio="1"
            src="../../public/img/media/notAvailable.jpg"
          />
        </q-card-section>

        <div class="q-py-sm col-7">
          <div>
            <q-card-section class="q-py-xs q-px-sm">
              <div class="col text-subtitle2 ellipsis">
                {{ props.row.name }}
              </div>
            </q-card-section>

            <q-card-section class="q-px-sm q-pt-xs q-pb-lg">
              <div class="text-body2 text-grey">
                {{ props.row.slug }}
              </div>
            </q-card-section>
          </div>

          <q-card-section class="row no-wrap items-center justify-between q-px-sm q-pt-sm q-pb-none">
            <div class="row no-wrap items-center">
              <q-avatar
                size="28px"
                class="q-mr-sm"
              >
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div>
                <div class="text-caption">
                  {{ props.row.creator }}
                </div>
                <div class="text-caption text-grey">
                  {{ moment(props.row.created_at).format('MMM Do, YYYY') }}
                </div>
              </div>
            </div>

            <q-icon
              color="grey"
              size="sm"
              style="transform: rotate(90deg)"
              class="q-ml-sm"
              name="reply"
            />
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    props: { type: Object, default: null }
  },
  components: {},
  methods: {
    typeItem (e) {
      if (typeof e === 'object' && e !== null && Object.keys(e).length < 3) return true
      else if (typeof e !== 'object') return true
      else if (e === null || e === '') return true
      else return false
    }
  },
  computed: {
    contentMediaIcon () {
      if (!this.props.row.media) return 'none'
      if (this.props.row.media.length === 11) return 'youtube'
      if (this.props.row.media > 0) return 'vimeo'
      if (this.props.row.media.includes('/')) return 'film'
      return 'none'
    }
  }
}
</script>

<style lang="stylus">
.content-list__card {
  height: 100%;
  // height: 250px;
}
</style>

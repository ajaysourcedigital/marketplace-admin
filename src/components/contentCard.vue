<template>
  <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <q-card
      @click="$emit('row-click', props.row)"
      class="content-list__card cursor-pointer hide-scrollbar"
      style="overflow-y: auto"
    >
      <div
        class="column no-wrap justify-between"
        style="height: 100%;"
      >
        <div v-if="props.row.media">
          <q-img
            :ratio="16/9"
            :src="`https://img.youtube.com/vi/${props.row.media}/0.jpg`"
          />
        </div>
        <div>
          <q-card-section class="q-py-sm">
            <div class="col text-h6 ellipsis">
              {{ props.row.name }}
            </div>
          </q-card-section>

          <q-card-section class="q-py-sm row no-wrap justify-between">
            <div class="ellipsis">
              <div class="col ellipsis text-subtitle1 text-grey">
                {{ props.row.slug }}
              </div>
              <div class="col ellipsis text-subtitle2 text-grey">
                {{ props.row.type }}
              </div>
            </div>

            <div class="col-auto text-grey text-caption q-px-md row items-center">
              <img
                :src="`img/media/${contentMediaIcon}.svg`"
                height="40px"
              >
            </div>
          </q-card-section>
        </div>

        <q-card-section class="q-pt-none">
          <div
            v-if="props.row.production"
            class="text-subtitle1 ellipsis"
          >
            {{ props.row.production.name }}
          </div>
          <div
            v-if="props.row.property"
            class="text-caption text-grey ellipsis"
          >
            {{ props.row.property.Name }}
          </div>
        </q-card-section>
      </div>
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
  height: 350px;
}
</style>

<template>
  <div
    :style="{
      width: (settings.width || 0) + 'px',
      width: (settings.width || 0) + 'px'
    }"
    v-html="_adContent"
    v-if="_adContent"
  />
</template>

<script>
export default {
  name: 'SmartBlockAd',
  data () {
    return {
      adContent: null
    }
  },
  props: {
    settings: Object,
    testMode: Boolean,
    error: Object
  },
  async mounted () {
    await this.renderContent()
  },
  computed: {
    _adContent () {
      if (this.adContent) return this.adContent
      if (this.testMode && !this.error) return 'Your ad will be rendered here.'
      return null
    }
  },
  methods: {
    async renderContent () {
      this.adContent = null
      this.$emit('update:error', null)
      if (this.settings.advangelists && this.settings.advangelists.pubId) {
        const params = new URLSearchParams({
          fmt: 'html',
          pubid: this.settings.advangelists.pubId,
          width: this.settings.width || 0,
          height: this.settings.height || 0,
          domain: window.location.origin,
          page: window.location.origin,
          appname: window.location.host,
          secure: 1,
          // The IAB category that best defines your site
          cats: this.settings.cats || [],
          // The IAB category of ads that you do NOT want to see returned
          bcat: this.settings.bcat || [],
          dnt: (navigator && navigator.doNotTrack) || 0,
          displaytype: 'banner',
          fb: '',
          isapp: 0
        })
        const baseURL = 'https://nep.advangelists.com/xp/js'

        try {
          const url = baseURL + '?' + params.toString()
          this.$listeners.render && this.$emit('render', { url })
          if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
            const message = 'This ad do not work in localhost. url: ' + url
            console.error(message)
            this.$emit('update:error', { message })
          } else {
            const { data: html, status } = await this.$axios.get(url)
            if (status !== 200) {
              this.$emit('update:error', { message: html, status })
            } else {
              this.adContent = html
            }
          }
        } catch (e) {
          console.error('Error occurred while loading the ad.', e)
        }
      }
    }
  }

}
</script>

<style>
</style>

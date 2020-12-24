import { QFile } from 'quasar'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
// Multiple files are not supported yet.
export default {
  props: {
    value: [File, String],
    height: String,
    backgroundSize: String
  },
  data () {
    return { $_objUrl: null }
  },
  watch: {
    value (val) {
      if (this.$_objUrl) {
        window.URL.revokeObjectURL(this.$_objUrl)
        this.$_objUrl = null
      }
      if (val && val instanceof File) this.$_objUrl = window.URL.createObjectURL(val)
    }
  },
  computed: {
    mediaType () {
      if (!this.value) return 'empty'
      if (this.$_objUrl && this.value.type.toUpperCase().startsWith('IMAGE')) return 'img'
      if (this.$_objUrl && this.value.type.toUpperCase().startsWith('VIDEO')) return 'video'
      return 'unknown'
    }
  },
  render (h) {
    const defaultSlot = h('div', {
      staticClass: 'column flex-center full-width',
      class: [`file-preview-input__${this.mediaType}`],
      style: {
        backgroundImage: this.mediaType === 'img' ? `url('${this.$_objUrl}')` : null,
        backgroundSize: this.mediaType === 'img' ? this.backgroundSize : null,
        height: this.height || '150px'
      }
    }, [
      this.value ? undefined : h('div', [this.text || 'Drag & drop a file here or click to choose a file.']),
      this.mediaType !== 'video' ? undefined : h(QMediaPlayer, {
        staticClass: 'fit',
        props: {
          type: 'video',
          source: this.$_objUrl
        }
      })
    ])

    return h(QFile, {
      props: {
        ...this.$attrs,
        multiple: false,
        value: this.value
      },
      staticClass: 'file-preview-input',
      scopedSlots: {
        selected: () => defaultSlot
      },
      on: this.$listeners
    })
  }
}

import { QFile, QImg, QCard, QCardSection, QBtn, QIcon } from 'quasar'
import { QMediaPlayer } from '@quasar/quasar-ui-qmediaplayer'
// Multiple files are not supported yet.
export default {
  props: {
    value: [File, Object],
    height: String,
    backgroundSize: String
  },
  methods: {
    $_renderDefaultSlot (h) {
      if (this.value && (this.value instanceof File)) {
        return undefined
      }
      return h('div', {
        staticClass: 'column flex-center full-width col-12',
        style: {
          minHeight: this.height || '150px'
        }
      }, [
        this.value ? this.$_renderFile(h, this.value.mime, this.value) : h(QIcon, {
          staticClass: 'q-ma-sm',
          props: { name: 'add_photo_alternate', size: 'sm' }
        }),
        h('div', [this.text || 'Drag & drop a file here or click to choose a file.'])
      ])
    },
    $_renderImage (h, file) {
      const isFile = file instanceof File
      if (isFile && !file.__img) {
        const img = new Image()
        img.src = window.URL.createObjectURL(file)
        file.__img = img
        file.__src = img.src
      }
      return h(QCard, { staticClass: 'full-width bg-grey-8 q-mb-md' }, [
        h('div', { style: { height: this.height || '150px' } }, [
          h(QImg, {
            staticClass: 'fit',
            props: {
              src: isFile ? file.__src : file.url,
              basic: true
            }
          }, [
          ]),
          this.$_renerRemoveBtn(h, file)
        ]),
        h(QCardSection, { staticClass: 'bg-white' }, [file.name])
      ])
    },
    $_renderVideo (h, file) {
      const isFile = file instanceof File
      if (isFile && !file.__src) {
        file.__src = window.URL.createObjectURL(file)
      }
      return h(QCard, { staticClass: 'full-width bg-grey-8' }, [
        h('div', {
          style: { height: this.height || '150px' }
        }, [
          h(QMediaPlayer, {
            staticClass: 'fit',
            props: {
              type: 'video',
              source: isFile ? file.__src : file.url
            }
          }),
          this.$_renerRemoveBtn(h, file)
        ]),
        h(QCardSection, { staticClass: 'bg-white' }, [file.name])
      ])
    },
    $_renerRemoveBtn (h, file) {
      return h(QBtn, {
        staticClass: 'absolute-top-right text-white bg-grey q-ma-sm all-pointer-events',
        props: { icon: 'close', round: true, size: 'sm' },
        on: {
          click: (ev) => {
            ev.stopPropagation()
            ev.preventDefault()
            this.$emit('input', null)
          }
        }
      })
    },
    $_renderFile (h, type, file) {
      if (type.toUpperCase().startsWith('IMAGE')) {
        return this.$_renderImage(h, file)
      } else if (type.toUpperCase().startsWith('VIDEO')) {
        return this.$_renderVideo(h, file)
      } else {
        return [file.name]
      }
    }
  },
  render (h) {
    return h(QFile, {
      props: {
        ...this.$attrs,
        multiple: false,
        value: (this.value instanceof File || !this.value) ? this.value : null
      },
      ref: 'file',
      staticClass: 'file-preview-input',
      scopedSlots: {
        default: () => this.$_renderDefaultSlot(h),
        file: ({ file }) => this.$_renderFile(h, file.type, file)
      },
      on: this.$listeners
    })
  }
}

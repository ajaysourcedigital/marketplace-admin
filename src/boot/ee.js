import ee from 'experience-engine'
import EventEmitter2 from 'eventemitter2'
import debug from 'src/utils/debug'

// ? creates a set of random hex digits 'l' length
const _r = (l) => {
  const pattern = '0123456789abcdef'
  let r = ''
  for (let i = 0; i < l; i++) {
    r += pattern[Math.floor(Math.random() * pattern.length)]
  }
  return r
}

// ? generates a v4 UUID (i.e 466e669d-f3a3-4e46-59b0-cdbaecf0fc34)
const uuid = () => {
  return `${_r(8)}-${_r(4)}-4${_r(3)}-${_r(4)}-${_r(12)}`
}

export default ({ Vue, store }) => {
  // TODO: Add this to the SDK
  ee.util.uuid = uuid
  Vue.prototype.$ee = ee
  Vue.prototype.$app = store.state.app
  Vue.prototype.$user = store.state.user

  const debugEvents = debug.extend('events')
  Vue.prototype.$debug = debug
  const event = new EventEmitter2({ wildcard: true, maxListeners: 20, verboseMemoryLeak: true })
  Vue.prototype.$bus = event

  event.onAny((name, payload) => {
    // Uncomment next line to back-trace where events came from...
    // console.trace()
    debugEvents(name, payload)
  })

  Vue.mixin({
    // Attaches events...
    created () {
      // Adds an automatically named local "debug"
      this.debug = this.$debug.extend(this.$options.name || '[unnamed]')
    },
    mounted () {
      if (this.$options.events) {
        const that = this
        Object.keys(this.$options.events).forEach(event => {
          this.$bus.on(event, this.$options.events[event].bind(that))
        })
      }
    },
    // Detaches events...
    beforeDestroy () {
      if (this.$options.events) {
        Object.keys(this.$options.events).forEach(event => {
          this.$bus.off(event, this.$options.events[event])
        })
      }
    }
  })
}

export { ee }

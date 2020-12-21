import ee from 'experience-engine'
import EventEmitter2 from 'eventemitter2'
import debug from 'src/utils/debug'

export default ({ Vue, store }) => {
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

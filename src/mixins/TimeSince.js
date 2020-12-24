import doTimeSince from 'src/utils/time-since'
const TimeSince = {
  methods: {
    getTimeSince: function (date) {
      return this.doTimeSince(date, false)
    },
    getTimeShort: function (date) {
      return this.doTimeSince(date, true)
    },
    getTimeLong: function (date) {
      return this.doTimeSince(date, false)
    },
    doTimeSince
  }
}
export default TimeSince

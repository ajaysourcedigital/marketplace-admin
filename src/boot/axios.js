import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default ({ Vue, store }) => {
  Vue.prototype.$api = {
    get () {
      
    }
  }
}
  
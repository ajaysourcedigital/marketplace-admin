import sanitizeHtml from 'sanitize-html'

export default ({ Vue }) => {
  Vue.prototype.$sanitize = (dirty, opts = null) => sanitizeHtml(dirty, opts)
}

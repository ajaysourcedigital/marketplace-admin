
export default ({ Vue }) => {
  Vue.prototype.$rules = {
    required: val => !!val || '* Required'
  }
}

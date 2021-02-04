import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import appDebug from 'src/utils/debug'
import moment from 'moment'

Vue.prototype.moment = moment

const debug = appDebug.extend('router')

Vue.use(VueRouter)

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    debug(`Router: Checking route: ${from.name} -> ${to.name}`)
    // If the app isn't loaded, show them a loading screen...
    if (!store.state.system.loaded) {
      if (to.name !== 'loading') {
        localStorage.setItem('pathToLoadAfterLogin', to.name)
        next({ name: 'loading' })
      } else {
        next()
      }
      // Does the page have a login requirement?
    } else if (to.matched.some(record => record.meta.requiresLogin) && !store.state.user.role) {
      debug('Router: Auth check...')
      if (from.name !== 'login') next({ name: 'login' })
      // No login requirement? Let them visit...
    } else {
      debug('Router: Routing...')
      next()
    }
  })

  Router.beforeResolve((to, from, next) => {
    if (localStorage.getItem('pathToLoadAfterLogin') && store.state.user.role && store.state.system.loaded) {
      console.log('attempting redirect based on local storage flag: ', localStorage.getItem('pathToLoadAfterLogin'))
      const nextPage = localStorage.getItem('pathToLoadAfterLogin') && localStorage.getItem('pathToLoadAfterLogin') !== 'undefined' ? localStorage.getItem('pathToLoadAfterLogin') : 'home'
      localStorage.setItem('priorPath', nextPage)
      localStorage.removeItem('pathToLoadAfterLogin')
      next({ name: nextPage })
    } else {
      next()
    }
  })
  return Router
}

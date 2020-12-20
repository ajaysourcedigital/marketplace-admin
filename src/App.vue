<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>

<script>
import settings from '../package.json'
export default {
  name: 'App',
  events: {
    // Handles all logout attempts...
    'app.logout' () {
      this.$auth.logout()
    },
    // Handles all routing...
    'app.route' (name) {
      console.log(`Routing to "${name}"`)
      if (this.$route.name !== name) this.$router.push({ name })
    }
  },
  mounted () {
    this.debug('Hydrating...')
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImlhdCI6MTYwODQxMDEyMCwiZXhwIjoxNjExMDAyMTIwfQ.34vDMSB1nEpgHvixQ_HZ2wmJxRzUev18RtaRjVDSng0
    this.$auth.loginUsingJWT()
      .then(result => {
        this.$store.commit('replaceUser', result)
        this.debug('Logged in via JWT', result)
      })
      .catch(e => {
        this.debug('Couldn\'t login via JWT:', e)
      })
      .finally(() => {
        this.$auth.hydrate(settings.sourcesync.slug)
          .then(result => {
            // If the user has some settings related to this app, apply them...
            if (this.$store.state.user.role) {
              let userAppSettings = JSON.parse(JSON.stringify(
                this.$store.state.user.settings.apps.settings[settings.sourcesync.slug]
              ))
              this.debug(`user settings for this app (${settings.sourcesync.slug})`, userAppSettings)
              // Merge respective user app settings into the application state...
              result = this.$ee.util.merge(result, { settings: userAppSettings })
            }
            this.$store.commit('replaceApp', result)
            this.debug('Application state loaded', result)
            this.$store.commit('loaded', true)
            this.$router.push({name: 'home'})
          })
      })
  }
}
</script>

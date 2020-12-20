<template>
  <q-layout v-if="$store.state.system.loaded">
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm?{'width': '80%'}:{'width':'30%'}">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="../statics/logo.png">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
              {{errorMsg}}
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="credentials.identifier" label="Identifier" lazy-rules />
              <q-input type="password" filled v-model="credentials.password" label="Password" lazy-rules />
              <div>
                <q-btn label="Login" @click="handleLogin" type="button" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
  export default {
    name: 'page-login',
    data() {
      return {
        settings: this.$store.state.app.settings,
        errorMsg: '',
        credentials: {
          identifier: 'authenticated@test.com',
          password: 'password'
        }
      }
    },
    methods: {
      handleLogin () {
        this.$auth.login(this.credentials.identifier, this.credentials.password)
          .then(result => {
            this.$store.commit('replaceUser', result)
            this.debug('Login success', result)
            this.$q.notify({ type: 'positive', message: 'Login successful'})
            this.$router.push({name: 'home'})
          })
          .catch(result => {
            this.debug('Login error', JSON.parse(JSON.stringify(result)))
            let err = result.response.status
            let message = this.$te(`login.errors.${err}`) ? this.$t(`login.errors.${err}`) : this.$t(`login.errors.default`)
            this.$q.notify({ type: 'negative', message })
          })
      }
    }
  }
</script>

<style>
  .bg-image {
   background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
  }
</style>

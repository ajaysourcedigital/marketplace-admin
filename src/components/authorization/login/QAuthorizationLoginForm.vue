<template>
  <q-form
    @submit="handleLogin"
    class="q-gutter-md q-mt-md"
  >
    <q-input
      filled
      type="email"
      v-model="mutableEmailLogin"
      @input="$emit('update:emailLogin', mutableEmailLogin)"
      label="Email"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Please, type your email'
      ]"
    />

    <q-input
      filled
      type="password"
      v-model="mutablePasswordLogin"
      @input="$emit('update:passwordLogin', mutablePasswordLogin)"
      label="Password"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'Please, type your password'
      ]"
    />

    <q-btn
      label="Sign In"
      type="submit"
      color="primary"
      class="q-mt-lg"
    />
  </q-form>
</template>

<script>
export default {
  name: 'QAuthorizationLoginForm',
  props: {
    emailLogin: String,
    passwordLogin: String
  },
  data () {
    return {
      mutableEmailLogin: this.emailLogin,
      mutablePasswordLogin: this.passwordLogin
    }
  },
  methods: {
    handleLogin () {
      this.$emit('handleLogin', {
        emailLogin: this.mutableEmailLogin,
        passwordLogin: this.mutablePasswordLogin
      })
    }
  }
}
</script>

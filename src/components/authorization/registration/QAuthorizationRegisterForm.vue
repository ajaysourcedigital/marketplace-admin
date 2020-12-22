<template>
  <q-form
    @submit="onSubmitRegister"
    class="q-gutter-md q-mt-md"
  >
    <div class="row no-wrap">
      <q-input
        filled
        v-model="mutableFirstName"
        @input="$emit('update:registerFormFirstName', mutableFirstName)"
        label="First Name"
        lazy-rules
        class="col-6 q-pr-md"
        :rules="[ val => val && val.length > 0 || 'Please provide your first name']"
      />

      <q-input
        filled
        v-model="mutableLastName"
        @input="$emit('update:registerFormLastName', mutableLastName)"
        label="Last Name"
        lazy-rules
        class="col-6 q-pl-md"
        :rules="[
          val => val !== null && val !== '' || 'Please provide your last name'
        ]"
      />
    </div>

    <q-input
      filled
      type="email"
      v-model="mutableEmail"
      @input="$emit('update:registerFormEmail', mutableEmail)"
      label="Email"
      lazy-rules
      :rules="[
        val => val && val.length > 0 || 'The email field must be a valid email'
      ]"
    />

    <q-input
      filled
      type="password"
      v-model="mutablePassword"
      @input="$emit('update:registerFormPassword', mutablePassword)"
      label="Choose a Password"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || 'The password field is required'
      ]"
    />

    <q-btn
      label="Submit"
      type="submit"
      color="primary"
      class="q-mt-lg"
    />
  </q-form>
</template>

<script>
export default {
  name: 'QAuthorizationRegisterForm',
  props: {
    registerFormFirstName: String,
    registerFormLastName: String,
    registerFormEmail: String,
    registerFormPassword: String
  },
  data () {
    return {
      mutableFirstName: this.registerFormFirstName,
      mutableLastName: this.registerFormLastName,
      mutableEmail: this.registerFormEmail,
      mutablePassword: this.registerFormPassword
    }
  },
  methods: {
    onSubmitRegister () {
      this.$emit('onSubmitRegister', {
        firstName: this.mutableFirstName,
        lastName: this.mutableLastName,
        email: this.mutableEmail,
        password: this.mutablePassword
      })
    }
  }
}
</script>

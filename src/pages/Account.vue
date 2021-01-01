<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-black">
          <q-card-section class="text-h6">
            <div class="text-h6">
              Edit Profile
            </div>
            <div class="text-subtitle2">
              Complete your profile
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-btn
                    label="Add Photo"
                    class="text-capitalize"
                    rounded
                    color="info"
                    style="max-width: 120px"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.username"
                    label="User Name"
                    name="username"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.email"
                    label="Email Address"
                    name="email"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.name"
                    label="Name"
                    name="firstName"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    autogrow
                    dense
                    v-model="user_details.address"
                    label="Address"
                    name="address"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.city"
                    label="City"
                    name="city"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.state"
                    label="State"
                    name="state"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.zip"
                    label="Postal Code"
                    name="zip"
                  />
                </q-item-section>
              </q-item>
              <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    @blur="handleBlur"
                    color="white"
                    dense
                    v-model="user_details.country"
                    label="Country"
                    name="country"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              class="text-capitalize bg-info text-black"
              @click="handleSubmit"
            >Update User Info</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
        <q-card class="card-bg text-black">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">
              Change Password
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Current Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  outlined
                  color="white"
                  round
                  v-model="password_dict.current_password"
                  label="Current Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> New Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  outlined
                  color="white"
                  round
                  v-model="password_dict.new_password"
                  label="New Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <q-item-section> Confirm New Password </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  outlined
                  round
                  color="white"
                  v-model="password_dict.confirm_new_password"
                  label="Confirm New Password"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              class="text-capitalize bg-info text-black"
              @click="updatePassword"
            >
              Change Password
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
    return {
      user_details: {},
      password_dict: {},
      form_state: {}
    }
  },
  methods: {
    handleBlur (e) {
      this.handleSubmit()
    },
    handleSubmit () {
      this.$api.put(`/user/${this.user_details.id}`, this.user_details)
        .then(response => {
          console.log('response', response)
        })
        .catch(response => {
          console.log('response', response)
        })
    },
    /* eslint-disable */
    updatePassword () {
      this.$api.post('/password',
        {
          identifier: this.user_details.username,
          password: this.password_dict.current_password,
          newPassword: this.password_dict.new_password,
          confirmPassword: this.password_dict.confirm_new_password
        }
      ).then(response => {
        this.password_dict = {};
        this.$q.notify({ type: 'positive', message: 'Password successfully changed' })
      }).catch(error => {
        console.log(JSON.parse(JSON.stringify(error)))
        this.$q.notify({ type: 'negative', message: error.response.data.data.message })
      })

    }
  },
  /* eslint-enable */
  beforeMount () {
    this.user_details = (({ username, id, name, email, address, city, state, country, zip }) => ({ username, id, name, email, address, city, state, country, zip }))(this.$store.state.user)
  }
}
</script>

<style scoped>
.card-bg {
  background-color: #fff;
}
</style>

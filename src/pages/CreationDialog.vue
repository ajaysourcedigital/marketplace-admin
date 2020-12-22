<template>
  <q-dialog
    v-model="value"
    persistent
  >
    <q-card>
      <q-toolbar>
        <q-avatar square>
          <img
            v-if='settings.logo'
            :src="settings.logo.wide"
          >
        </q-avatar>
        <q-toolbar-title class="text-capitalize"><span class="text-weight-bold">Create</span> {{name}}</q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="close"
          @click="$emit('close')"
        />
      </q-toolbar>
      <q-card-section class='q-px-lg q-py-sm'><span class='text-capitalize'>{{name}}</span> creation... Once finished, you will be redirected to the editor.</q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-card-section class='row fit'>
          <div
            v-for='(contents, index) in list'
            :key='index'
            :class='contents === "name" || contents === "type" ? "col-12" : "col-lg-6 col-xl-6 col-md-6 col-sm-12 col-xs-12"'
            class="q-pa-sm"
          >
            <q-input
              v-if='contents === "name"'
              filled
              :label='capitalize(contents)'
              v-model="content[contents]"
              :rules="[val => !!val || 'Field is required']"
            />
            <q-select
              v-else-if='contents === "type"'
              filled
              v-model="content[contents]"
              :options="options"
              :label='capitalize(contents)'
            />
            <q-input
              class='q-pb-md'
              v-else
              filled
              :label='capitalize(contents)'
              v-model="content[contents]"
            />
          </div>
          <div class='q-pa-sm col-12 row justify-end'>
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    name: { type: String, default: null },
    value: { type: Boolean, default: false }
  },
  mounted () {
    this.content.creator = this.$store.state.user.username
  },
  data () {
    return {
      settings: this.$store.state.app.settings,
      content: {},
      options: ['dynamic', 'overlay', 'legacy', 'audio', 'video', 'interactive', 'catalog']
    }
  },
  computed: {
    // generate list
    list () {
      let list = []
      switch (this.name) {
        case 'content':
          list = ['name', 'slug', 'creator', 'clientId', 'media', 'type']
          break
        case 'metacontent':
          list = ['name', 'uuid', 'views', 'interactions', 'conversations', 'distributions', 'clientId']
          break
        case 'campaign':
          list = ['name', 'slug', 'creator', 'clientId', 'media', 'type']
          break
      }
      return list
    }
  },
  methods: {
    // capitalizing first letter... just for looks
    capitalize (str) {
      return str.replace(/^\w/, c => c.toUpperCase())
    },
    // handles sumbit and rerouting
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitting...'
      })
      const location = this.name === 'content' ? '/distributions' : this.name === 'metacontent' ? '/activations' : '/distributions'
      this.$api.post(location, this.content)
        .then(response => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Redirecting...'
          })
          this.debug('DATA', response.data)
          const { id } = response.data
          this.$emit('close')
          this.$router.push({ name: 'edit-' + this.name, params: { id } })
        })
        .catch(response => {
          this.debug('ERROR', response)
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'close',
            message: 'There was an error...'
          })
        })
    },
    // reset
    onReset () {
      this.content = {}
    }
  }
}
</script>

<template>
  <div>
    <div v-if="configure">
      <q-card style="border-radius: 8px;">
        <img
          src="https://surveyjs.io/Content/Images/logo_1200x630.jpg"
          width="100%"
        >
        <q-card-section>
          <div class="q-pa-sm">
            This block uses Survey.js survey objects. You can create absolutely any
            type of form you can imagine. Visit
            <a href="https://surveyjs.io/create-survey">the SurveyJS creator</a> to
            build content, then paste it below...
            <q-input
              class="q-pa-sm"
              outlined
              @input="emitConfig"
            />

            <q-input
              label="API endpoint"
              class="q-pa-sm"
            />
            <q-input
              label="Data transformer"
              class="q-pa-sm"
            />
            <q-input
              label="Action label"
              class="q-pa-sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
    <survey
      v-else
      :survey="survey"
    />
  </div>
</template>
<script>
import * as SurveyVue from 'survey-vue'
import 'survey-vue/survey.css'
SurveyVue.StylesManager.applyTheme('default')
const Survey = SurveyVue.Survey
import { throttle } from 'quasar'

export default {
  name: 'MetacontentBlockSurvey',
  props: {
    settings: Object,
    configure: Boolean
  },
  components: {
    Survey
  },
  mounted () {
    // Survey.js emits multiple changes per second, throttle them...
    this.emitChange = throttle(this.emitChange, 500)
  },
  data () {
    var json = this.settings
    var model = new SurveyVue.Model(json)
    model.onComplete.add(this.emitAction)
    return {
      survey: model,
      config: ''
    }
  },
  methods: {
    emitAction () {
      this.$emit('action', this.survey.data)
    },
    emitChange () {
      this.$emit('change', this.survey.data)
    },
    emitConfig (data) {
      try {
        // data = JSON.stringify(data)
        const errorCheck = JSON.parse(JSON.stringify(data))
        if (typeof errorCheck === 'string') this.debug('Evals to string :(') // throw new Error('Invalid JSON')
        this.$emit('config', data)
      } catch (e) {
        this.$q.notify('Uh oh! That\'s invalid JSON. Check your data and try again.')
      }
    }
  },
  // Must watch for changes to the survey so we can emit them...
  watch: {
    survey: {
      handler (val, oldVal) {
        this.emitChange()
      },
      deep: true
    }
  }
}
</script>

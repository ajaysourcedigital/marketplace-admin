<template>
  <div class="fit overflow-hidden">
    <div
      v-if="configure"
      class="q-pa-sm"
    >
      <q-form
        @submit="submit"
        @reset="reset"
        ref="brandForm"
        greedy
        class="q-gutter-sm"
      >
        <div>
          <template v-for="(field, index) in fields">
            <q-checkbox
              v-if="field.type === 'toggle'"
              :key="index"
              :label="field.label"
              :value="
                field.inset
                  ? details[field.inset][field.slug]
                  : details[field.slug]
              "
              @input="val => handleInput(val, field)"
              class="q-mx-none q-px-none"
            />
            <template v-else>
              <div
                :key="index"
                class="q-mb-md"
              >
                <q-input
                  v-show="field.inset ? !!details[field.inset]['show'] : true"
                  :value="
                    field.inset
                      ? details[field.inset][field.slug]
                      : details[field.slug]
                  "
                  :type="field.type"
                  :label="field.label"
                  :rules="field.required ? [val => !!val || 'Required *'] : []"
                  :filled="field.filled"
                  :placeholder="field.placeholder"
                  @input="val => handleInput(val, field)"
                >
                  <template
                    v-if="field.slot === 'color'"
                    #append
                  >
                    <q-icon
                      name="colorize"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-color
                          v-if="field.inset"
                          v-model="details[field.inset][field.slug]"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
          </template>
        </div>
        <div class="full-width row justify-end">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="Save"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
    <div
      v-else
      class="row q-my-xs"
    >
      <div
        v-if="settings.name"
        class="q-pa-sm full-width"
      >
        <q-img
          v-if="settings.logo.show"
          :src="settings.logo.href"
          contain
          :ratio="1"
          :style="{ maxWidth: '120px' }"
        />
        <div
          v-if="settings.tagline.show"
          class="col-12 q-my-md"
        >
          <span class="text-h5">{{ settings.tagline.text }}</span>
        </div>
        <div
          v-if="settings.cta.show"
          class="col-12 q-mb-sm"
        >
          <q-btn
            :label="settings.cta.text"
            class="text-weight-bold full-width"
            :style="styles.cta"
            @click="handleCTAClick(settings.cta.href)"
          />
        </div>
        <div
          v-if="settings.image.show"
          class="q-mt-md q-pa-md rounded-borders"
          :style="styles.card"
        >
          <q-img
            :src="settings.image.src"
            cover
            :ratio="1"
            :style="{ maxWidth: '100%' }"
          />
        </div>
        <div v-if="settings.video.show">
          <q-card
            dark
            class="q-mt-md text-grey-8"
          >
            <div class="q-pa-xs">
              <q-responsive
                style="max-height:100vh"
                :ratio="16 / 9"
              >
                <iframe
                  v-if="Number.isInteger(settings.video.src)"
                  :src="`https://player.vimeo.com/video/` + settings.video.src"
                  width="100%"
                  height="360"
                  allowfullscreen
                />
                <iframe
                  v-else-if="settings.video.src.length === 11"
                  :src="`https://www.youtube.com/embed/` + settings.video.src"
                  width="100%"
                  height="360"
                  allowfullcreen
                />
                <video
                  v-else
                  ref="videoB"
                  :src="settings.video.src"
                  loop
                  controls
                  style="width:100%; 'margin-top': 10"
                />
              </q-responsive>
            </div>
          </q-card>
        </div>
        <div
          v-if="settings.description"
          class="q-mt-md"
        >
          <q-card dark>
            <q-card-section v-html="sanitizedDescription" />
          </q-card>
        </div>
      </div>
      <div v-else>
        Your brand will show here.
      </div>
    </div>
  </div>
</template>
<script>
import clonedeep from 'lodash/cloneDeep'
export default {
  name: 'SmartBlockBrand',
  props: {
    settings: Object,
    configure: Boolean
  },
  data: () => ({
    details: {}
  }),
  computed: {
    /** @returns { array }
     *  @description schema for text-fields
     **/
    fields () {
      return [
        { slug: 'name', label: 'Name', required: true, type: 'text' },
        { inset: 'logo', slug: 'show', label: 'Show logo', type: 'toggle' },
        {
          inset: 'logo',
          slug: 'href',
          label: 'Logo',
          type: 'url',
          placeholder: 'https://something.com/logo.png'
        },
        {
          inset: 'tagline',
          slug: 'show',
          label: 'Show Tagline',
          type: 'toggle'
        },
        { inset: 'tagline', slug: 'text', label: 'Tagline', type: 'text' },
        { inset: 'cta', slug: 'show', label: 'Show Button', type: 'toggle' },
        {
          inset: 'cta',
          slug: 'text',
          label: 'Button Text',
          type: 'text',
          placeholder: 'Click me'
        },
        {
          inset: 'cta',
          slug: 'href',
          label: 'Redirect URL',
          type: 'url',
          placeholder: 'https://sourcesync.io'
        },
        {
          inset: 'cta',
          slug: 'colorOverride',
          label: 'Background Color',
          type: 'text',
          slot: 'color'
        },
        {
          inset: 'cta',
          slug: 'textColorOverride',
          label: 'Text Color',
          type: 'text',
          slot: 'color'
        },
        { inset: 'image', slug: 'show', label: 'Show Image', type: 'toggle' },
        {
          inset: 'image',
          slug: 'src',
          label: 'Image URL',
          type: 'url',
          placeholder: 'https://something.com/image1.png'
        },
        {
          inset: 'image',
          slug: 'card',
          label: 'Image Card Color',
          type: 'text',
          slot: 'color'
        },
        { inset: 'video', slug: 'show', label: 'Show Video', type: 'toggle' },
        {
          inset: 'video',
          slug: 'src',
          label: 'Video URL',
          type: 'text',
          placeholder: 'Vimeo/Youtube video id - dQw4w9WgXcQ or local file url'
        },
        {
          slug: 'description',
          label: 'Description',
          type: 'textarea',
          filled: true,
          placeholder: '- Supports markdown syntax'
        }
      ]
    },
    /** @returns { object }
     *  @description default schema for data object
     **/
    schemaData () {
      return {
        name: '',
        description: '',
        logo: {
          show: false,
          href: ''
        },
        tagline: {
          show: true,
          text: ''
        },
        cta: {
          show: false,
          text: '',
          href: '',
          colorOverride: '#0e9dcc',
          textColorOverride: '#ffffff'
        },
        image: {
          show: false,
          card: '#ffffff',
          src: ''
        },
        video: {
          show: false,
          src: ''
        }
      }
    },
    /** @returns { object } */
    styles () {
      const {
        cta: { colorOverride = '#0e9dcc', textColorOverride = '#ffffff' },
        image: { card = '#666666' }
      } = this.settings
      return {
        cta: {
          backgroundColor: colorOverride,
          color: textColorOverride
        },
        card: {
          backgroundColor: card
        }
      }
    },
    /** @returns { string } */
    sanitizedDescription () {
      return this.$ee.templates.md.default(
        this.$ee.templates.html.escape(this.settings.description)
      )
    }
  },
  methods: {
    handleCTAClick (link) {
      window.open(link, '_blank')
    },
    handleInput (value, field) {
      if (field.inset) {
        this.details[field.inset][field.slug] = value
      } else {
        this.details[field.slug] = value
      }
    },
    submit () {
      const data = clonedeep(this.details)
      this.$emit('config', data)
    },
    reset () {
      // reset to default state
      this.details = clonedeep(this.schemaData)
    }
  },
  created () {
    // setup default state
    this.details = clonedeep(this.schemaData)
  },
  mounted () {
    this.details = clonedeep(this.settings)
  }
}
</script>

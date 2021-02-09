<template>
  <q-page
    padding
    class="page-edit-content"
  >
    <template>
      <!-- Page body -->
      <div class="row q-col-gutter-lg">
        <!-- Form Card -->
        <div class="col-xs-12 col-md-8">
          <q-card>
            <q-card-section class="row items-center">
              <q-icon
                name="list"
                style="color: rgb(26, 140, 193);"
                size="md"
              />
              <div
                class="text-uppercase text-h6 text-bold q-ml-sm"
                style="color: rgb(26, 140, 193);"
              >
                {{ content.name }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row q-col-gutter-md">
                <q-input
                  outlined
                  class="col-xs-12"
                  label="Name"
                  required
                  v-model="content.name"
                />
              </div>
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="logoButton"
                label="Logo Button"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Brand Logo (Top Left - SMALL)"
                v-model="logoLink"
              />
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="tagLine"
                label="Tagline (On/Off)"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Tagline"
                v-model="tagLineText"
              />
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="insertion"
                label="Ad Insertion"
              />
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="redirectBtn"
                label="Redirect Button ON / OFF"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Button Text"
                v-model="redirectBtnText"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Button Redirect URL"
                v-model="redirectBtnURL"
              />
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="btnColorOverride"
                label="Button Color Override On / Off"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Button Redirect Color (Override Only)"
                v-model="btnColorOverrideBg"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Button Text Color (Override Only)"
                v-model="btnColorOverrideText"
              />
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="brandImage"
                label="Brand Image On/Off"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Brand Image URL (Main-Grid - Large)"
                v-model="brandImageURL"
              />
              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Brand Image Card Color (rgb)"
                v-model="brandImageBgColor"
              />
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="location"
                label="Location On / Off"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Brand Image URL (Main-Grid - Large)"
                v-model="locationData"
              >
                <template v-slot:after>
                  <q-btn
                    round
                    icon="map"
                  />
                </template>
              </q-input>
            </q-card-section>

            <q-card-section>
              <q-checkbox
                v-model="brandVideo"
                label="Brand Video On/Off"
              />

              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="Brand Video URL"
                v-model="brandVideoURL"
              />
            </q-card-section>

            <q-card-section>
              <q-input
                type="textarea"
                label="Description"
                outlined
                class="col-xs-12 q-mt-sm"
                v-model="description"
                autogrow
              />
            </q-card-section>

            <q-card-section>
              <q-input
                outlined
                class="col-xs-12 q-mt-sm"
                label="ID"
                v-model="idNumber"
                readonly
              />
            </q-card-section>

            <q-card-section class="row justify-between">
              <q-btn
                color="blue"
                label="Save"
              />
              <q-btn
                color="red"
                label="Delete data object"
              />
            </q-card-section>
          </q-card>
        </div>
        <!-- Preview -->
        <div class="col-md">
          <q-card
            dark
            class="bg-grey-9"
          >
            <q-card-section v-if="logoButton">
              <q-img
                :src="logoLink"
                contain
                style="height: 150px"
              />
            </q-card-section>

            <q-card-section v-if="tagLine">
              <div class="text-body1">
                {{ tagLineText }}
              </div>
            </q-card-section>

            <q-card-section v-if="redirectBtn">
              <q-btn
                v-if="!btnColorOverride"
                color="blue"
                class="full-width"
                :label="redirectBtnText"
                :href="redirectBtnURL"
                type="a"
                target="_blank"
              />

              <q-btn
                v-else
                :style="`
                  color: ${btnColorOverrideText} !important;
                  background-color: ${btnColorOverrideBg} !important
                `"
                class="full-width"
                :label="redirectBtnText"
                :href="redirectBtnURL"
                type="a"
                target="_blank"
              />
            </q-card-section>

            <div
              v-if="insertion"
              class="q-pb-lg"
            />

            <q-card-section
              v-if="brandImage && brandImageURL"
              :style="`background-color: ${brandImageBgColor}`"
            >
              <q-img
                :src="brandImageURL"
                :ratio="16/9"
                class="q-pa-md"
              />
            </q-card-section>

            <q-card-section v-if="location">
              Here have to be map
            </q-card-section>

            <q-card-section v-if="brandVideo">
              <q-video
                :ratio="16/9"
                :src="`https://www.youtube.com/embed/${brandVideoURL}?rel=0`"
              />
            </q-card-section>

            <q-card-section v-if="description">
              <p v-html="description" />
            </q-card-section>
          </q-card>
          <!-- <q-img
              :ratio="16/9"
              :src="content.media ? `https://img.youtube.com/vi/${content.media}/0.jpg` : 'https://via.placeholder.com/150?text=N/A'"
            />
            <q-card-section class="row justify-between items-center">
              <div>
                <div class="text-caption">
                  Link
                  to
                  video
                </div>
                <div>
                  <a
                    class="text-blue"
                    target="_blank"
                    :href="`https://youtu.be/${content.media}`"
                  >
                    https://youtu.be/{{ content.media }} </a>
                </div>
              </div>
              <q-btn
                @click="copyToClipboard(`https://youtu.be/${content.media}`)"
                flat
                round
                dense
                icon="content_copy"
              >
                <q-tooltip>Copy to clipboard</q-tooltip>
              </q-btn>
            </q-card-section>
            <q-list padding>
              <q-item>
                <q-item-section
                  side
                  top
                >
                  <q-item-label>
                    Last Updated
                  </q-item-label>
                </q-item-section>
                <q-item-section class="text-right">
                  <q-item-label>
                    {{ $d(new Date(content.updated_at), 'long') }}
                  </q-item-label>
                  <q-item-label
                    caption
                    v-if="content.updated_by"
                  >
                    By {{ [content.updated_by.firstname, content.updated_by.lastname].join(' ') }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section
                  side
                  top
                >
                  <q-item-label>
                    Created
                  </q-item-label>
                </q-item-section>
                <q-item-section class="text-right">
                  <q-item-label>
                    {{ $d(new Date(content.created_at), 'long') }}
                  </q-item-label>
                  <q-item-label
                    caption
                    v-if="content.created_by"
                  >
                    By {{ [content.created_by.firstname, content.created_by.lastname].join(' ') }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list> -->
        </div>
      </div>
    </template>
    <inner-loading :showing="content === null" />
  </q-page>
</template>

<script>
import InnerLoading from 'components/InnerLoading'
// import { FilePreviewInput } from 'components/file-preview-input'
import { copyToClipboard } from 'quasar'

export default {
  name: 'PageEditContent',
  components: {
    InnerLoading
    // FilePreviewInput
  },
  props: {
    id: [String, Number]
  },
  data () {
    return {
      logoButton: false,
      logoLink: 'https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/16ac2895-6752-4858-b344-00a820134f03.png',
      tagLine: false,
      tagLineText: 'MotorTrend OnDemand',
      insertion: false,
      redirectBtn: true,
      redirectBtnText: 'Get Your Free Trial',
      redirectBtnURL: 'https://www.motortrendondemand.com/subscribe',
      btnColorOverride: true,
      btnColorOverrideBg: 'Red',
      btnColorOverrideText: 'Black',
      brandImage: true,
      brandImageURL: 'https://sourcecentralstorage.blob.core.windows.net/customer-5c9ce8e441ed370360546232/6c0888f6-4d58-4c43-bc13-eff193680f1e.jpg',
      brandImageBgColor: '',
      location: false,
      brandVideo: true,
      brandVideoURL: 'IfZ1BvlwFqQ',
      locationData: '(0, 0)',
      description: "Original Shows, Outrageous Cars!Get new exclusive episodes, early access to top hits, and access to thousands of hours of shows, documentaries and Motorsports. Watch original automotive shows, live motorsports, & car enthusiast programming on MotorTrend; the world's premier online automotive video destination!",
      idNumber: '121029oiihwoefh0',
      content: null
    }
  },
  async created () {
    try {
      const { data } = await this.$api(`/distributions/${this.id}`)
      this.setData(data)
    } catch (e) {
      console.error('Error occurred while fetching data.', e)
    }
  },
  computed: {
    selectedMediaType () {
      if (!this.content) return null
      return this.mediaOpts.find(i => i.id === this.content.mediaType)
    }
  },
  methods: {
    setData (data) {
      this.content = data
      if (this.content.settings && typeof this.content.settings === 'object') {
        this.contentSettingsStr = JSON.stringify(this.content.settings, null, 2)
      } else this.contentSettingsStr = ''
    },
    isValidJSON (val) {
      if (val === null || val === '') return true
      try {
        const obj = JSON.parse(val)
        return obj && typeof obj === 'object'
      } catch (e) { }
      return false
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: 'This file is not supported.'
      })
    },
    async onSubmit () {
      this.content.settings = this.contentSettingsStr ? JSON.parse(this.contentSettingsStr) : null

      const data = {}
      const payload = Object.keys(this.content).reduce((_payload, key) => {
        const value = this.content[key]
        if (value instanceof File) {
          _payload.append(`files.${key}`, value, value.name)
        } else if (Array.isArray(value)) {
          value.filter(i => i instanceof File).forEach(i => {
            _payload.append(`files.${key}`, i, i.name)
          })
        } else {
          data[key] = value
        }
        return _payload
      }, new FormData())

      payload.append('data', JSON.stringify(data))

      this.debug(this.content)
      this.$api.put(`/distributions/${this.id}`, payload)
        .then(res => {
          this.debug(res)
          this.setData(res.data)
          this.$q.notify({
            type: 'positive',
            message: 'Saved successfully'
          })
        }).catch(err => {
          console.error('Error occurred while saving.', err, err.response)
          this.$q.notify({
            type: 'negative',
            message: 'Error occurred'
          })
        })
    },
    copyToClipboard (s) {
      const url = s.url ? `${s.url + s.distribution}` : s
      copyToClipboard(url).then(() => {
        this.$q.notify(`"${url}" was copied to your clipboard!`)
      })
    }
  }
}
</script>
<style lang="stylus">
.edit-content-form {
  &__settings, &__media {
    &>label {
      display: block;
      color: $input-label-color;
    }
  }
}
</style>

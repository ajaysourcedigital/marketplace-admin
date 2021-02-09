<template>
  <q-page
    padding
    class="page-edit-content"
  >
    <template v-if="content">
      <q-form
        @submit="onSubmit"
        greedy
      >
        <!-- Header -->
        <div class="q-mb-lg row">
          <div class="text-h5 text-bold col">
            {{ content.name }}
          </div>
          <div>
            <q-btn
              label="Save"
              type="submit"
              color="primary"
            />
          </div>
        </div>
        <!-- Page body -->
        <div class="row q-col-gutter-lg">
          <!-- Form Card -->
          <div class="col-xs-12 col-md-8">
            <q-card
              flat
              class="bg-transparent"
            >
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <q-input
                    outlined
                    class="col-xs-12"
                    label="Name (required field)"
                    required
                    v-model="content.name"
                  />
                  <q-input
                    v-model="text"
                    class="col-xs-12"
                    label="Description"
                    outlined
                    type="textarea"
                  />
                  <q-card-section>
                    <div>
                      Cover
                    </div>
                    <div class="text-caption text-grey-6">
                      Choose an icon from the suggested ones or upload a new one. It should grab the viewer's attention and reflect the content of the video.
                    </div>
                    <div class="row">
                      <div class="col-xs-6 edit-content-form__cover q-mt-sm">
                        <file-preview-input
                          filled
                          stack-label
                          v-model="content.cover"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </q-card-section>
                  <q-select
                    outlined
                    class="col-xs-12"
                    label="Type"
                    required
                    v-model="content.type"
                    :options="optionsType"
                  />
                  <q-select
                    outlined
                    class="col-xs-12"
                    label="Media Type *"
                    required
                    :options="mediaOpts"
                    emit-value
                    map-options
                    option-value="id"
                    v-model="content.mediaType"
                  >
                    <template #option="{opt, itemEvents, itemProps}">
                      <q-item
                        v-bind="itemProps"
                        v-on="itemEvents"
                      >
                        <q-item-section avatar>
                          <q-icon
                            color="primary"
                            :name="opt.icon"
                          />
                        </q-item-section>
                        <q-item-section>
                          {{ opt.label }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>

                  <template v-if="selectedMediaType">
                    <div
                      class="col-xs-12"
                      v-if="selectedMediaType.type === 'id'"
                    >
                      <q-input
                        outlined
                        label="Media ID *"
                        required
                        v-model="content.mediaId"
                      />
                    </div>
                    <div
                      class="col-12"
                      v-else-if="selectedMediaType.type === 'file'"
                    >
                      <file-preview-input
                        v-model="content.mediaFile"
                        filled
                        accept="video/*"
                        height="300px"
                      />
                    </div>
                  </template>

                  <q-select
                    outlined
                    class="col-xs-12"
                    label="Aspect Ratio"
                    required
                    v-model="aspectRatio"
                    :options="optionsAspectRatio"
                  />

                  <q-input
                    outlined
                    class="col-xs-12"
                    label="FPS"
                    v-model="content.fps"
                  />

                  <q-input
                    outlined
                    class="col-xs-12"
                    label="Duration"
                    v-model="content.duration"
                  />

                  <q-select
                    outlined
                    class="col-xs-12"
                    label="Series"
                    required
                    v-model="series"
                    :options="optionsSeries"
                  />

                  <q-select
                    outlined
                    class="col-xs-12"
                    label="Season"
                    required
                    v-model="season"
                    :options="optionsSeason"
                  />

                  <q-input
                    outlined
                    label="Creator"
                    readonly
                    class="col-xs-12 col-sm-6"
                    v-model="content.creator"
                  />
                  <q-input
                    outlined
                    label="Client ID"
                    class="col-xs-12 col-sm-6"
                    v-model="content.clientId"
                  />
                </div>
              </q-card-section>

              <q-card-section class=" edit-content-form__media">
                <label class="text-subtitle1">
                  Media
                </label>
                <div class="row q-col-gutter-md" />
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div class="col-xs-12 edit-content-form__settings">
                    <q-input
                      type="textarea"
                      label="Settings"
                      filled
                      class="q-pt-sm"
                      v-model="contentSettingsStr"
                      height="400px"
                      :rules="[val => isValidJSON(val) || 'Invalid JSON']"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <!-- Metadata -->
          <div class="col-md">
            <q-card
              flat
              class="bg-transparent"
            >
              <q-card-section class="text-h6 q-pa-none q-mb-md">
                Information
              </q-card-section>

              <q-card
                class="bg-grey-4"
                style="border-radius: 4px;"
              >
                <q-img
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
              </q-card>
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
              </q-list>
            </q-card>
          </div>
        </div>
      </q-form>
    </template>
    <inner-loading :showing="content === null" />
  </q-page>
</template>

<script>
import InnerLoading from 'components/InnerLoading'
import { FilePreviewInput } from 'components/file-preview-input'
import { copyToClipboard } from 'quasar'

export default {
  name: 'PageEditContent',
  components: {
    InnerLoading,
    FilePreviewInput
  },
  props: {
    id: [String, Number]
  },
  data () {
    return {
      content: null,
      contentSettingsStr: null,
      mediaVideoBlobUrl: null,
      mediaOpts: [
        { id: 'youtube', type: 'id', label: 'Youtube', icon: 'fab fa-youtube' },
        { id: 'vimeo', type: 'id', label: 'Vimeo', icon: 'fab fa-vimeo' },
        { id: 'file', type: 'file', label: 'Upload Media File', icon: 'fas fa-file' }
      ],
      optionsType: [
        'video', 'catalog', 'admin', 'overlay', 'interactive'
      ],
      aspectRatio: '16:9',
      optionsAspectRatio: [
        '4:3', '16:9', '9:16', '1.85:1', '2:1', '2.35:1', '2.39:1'
      ],
      series: '0 Rick Lane',
      optionsSeries: [
        'test', '0 Rick Lane'
      ],
      season: null,
      optionsSeason: [
        '1', '2', '3'
      ]
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

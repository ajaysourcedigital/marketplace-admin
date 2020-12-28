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
          <div class="text-h6 col">
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
            <q-card>
              <q-card-section>
                <div class="row q-col-gutter-md">
                  <q-input
                    class="col-xs-12"
                    label="Name *"
                    required
                    v-model="content.name"
                  />
                  <q-input
                    label="Creator"
                    readonly
                    class="col-xs-12 col-sm-6"
                    v-model="content.creator"
                  />
                  <q-input
                    label="Client ID"
                    class="col-xs-12 col-sm-6"
                    v-model="content.clientId"
                  />
                </div>
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div class="col-xs-12 edit-content-form__cover">
                    <file-preview-input
                      filled
                      label="Cover"
                      stack-label
                      v-model="content.cover"
                      accept="image/*"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class=" edit-content-form__media">
                <label class="text-subtitle1">
                  Media
                </label>
                <div class="row q-col-gutter-md">
                  <div class="col-xs-12 col-sm-4">
                    <q-select
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
                  </div>
                  <template v-if="selectedMediaType">
                    <div
                      class="col-xs-12 col-sm-8"
                      v-if="selectedMediaType.type === 'id'"
                    >
                      <q-input
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
                </div>
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
            <q-card>
              <q-card-section class="text-subtitle2">
                Information
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

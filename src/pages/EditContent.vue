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
                      clearable
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
                      v-model="content.media"
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
                  <template v-if="content.media">
                    <div
                      class="col-xs-12 col-sm-8"
                      v-if="content.media.type === 'id'"
                    >
                      <q-input
                        label="Media ID *"
                        required
                      />
                    </div>
                    <div
                      class="col-12"
                      v-else-if="content.media.type === 'file'"
                    >
                      <file-preview-input
                        v-model="content.mediaFile"
                        filled
                        accept="video/*"
                        clearable
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
      this.content = data
      if (this.content.settings && typeof this.content.settings === 'object') {
        this.contentSettingsStr = JSON.stringify(this.content.settings, null, 2)
      } else this.contentSettingsStr = ''
    } catch (e) {
      console.error('Error occurred while fetching data.', e)
    }
  },
  methods: {
    isValidJSON (val) {
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
    onSubmit () {
      this.content.settings = this.contentSettingsStr ? JSON.parse(this.contentSettingsStr) : null
      this.$q.notify({
        type: 'positive',
        message: 'Saved successfully'
      })
      this.debug(this.content)
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

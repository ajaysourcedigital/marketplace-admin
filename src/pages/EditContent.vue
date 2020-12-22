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
                    <q-uploader
                      label="Cover"
                      class="fit"
                      accept="image/*"
                      v-model="content.cover"
                      flat
                      hide-upload-btn
                      bordered
                      @rejected="onRejected"
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
                  <div
                    class="col-xs-12 col-sm-8"
                    v-if="content.media"
                  >
                    <template v-if="content.media.type === 'id'">
                      <q-input
                        label="Media ID *"
                        required
                      />
                    </template>
                    <template v-else-if="content.media.type === 'file'">
                      <q-uploader
                        label="Media File *"
                        class="fit"
                        required
                        accept="video/*"
                        flat
                        hide-upload-btn
                        bordered
                        @rejected="onRejected"
                      />
                    </template>
                  </div>
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
                      :value="typeof content.settings === 'string' ? content.settings : JSON.stringify(content.settings, null, 2)"
                      @input="onSettingsChange"
                      height="400px"
                      :rules="[val => isValidJSON(val) || 'Invalid JSON.']"
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
                    <q-item-label caption>
                      by User Name
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
                    <q-item-label caption>
                      by User Name
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

export default {
  name: 'PageEditContent',
  components: {
    InnerLoading
  },
  props: {
    id: [String, Number]
  },
  data () {
    return {
      content: null,
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
    } catch (e) {
      console.error('Error occurred while fetching data.', e)
    }
  },
  methods: {
    // Quirky, temporary solution for json validation
    onSettingsChange (val) {
      if (this.isValidJSON(val)) this.content.settings = JSON.parse(val)
      this.content.settings = val
    },
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

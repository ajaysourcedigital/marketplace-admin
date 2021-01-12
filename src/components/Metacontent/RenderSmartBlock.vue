<template>
  <div>
    <div
      v-if="preview"
      style="border: 1px solid #ccc;padding:0px;margin:0px"
    >
      <!-- Rendering for preview does a lot of stuff -->
      <q-toolbar :class="`bg-${settings.color} text-white`">
        {{ settings.title }}
        <q-space />
        <q-tabs
          v-model="currentTab"
          shrink
        >
          <q-tab
            name="tabPreview"
            label="Preview"
          />
          <q-tab
            name="tabSettings"
            label="Settings"
          />
          <q-tab
            name="tabData"
            label="Data"
          />
          <q-btn
            @click="deleteMe"
            icon="close"
            flat
            dense
            small
          />
        </q-tabs>
      </q-toolbar>
      <q-tab-panels
        v-model="currentTab"
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-tab-panel
          name="tabPreview"
          style="margin:0px;padding:0px"
        >
          <component
            :is="`smart-block-${settings.name}`"
            @action="processAction"
            @change="processChange"
            @config="processConfig"
            :settings="settings.settings"
          />
        </q-tab-panel>
        <q-tab-panel
          name="tabSettings"
          style="margin:0px;padding:0px"
        >
          <component
            :is="`smart-block-${settings.name}`"
            @action="processAction"
            @change="processChange"
            @config="processConfig"
            :settings="settings.settings"
            :configure="true"
          />
        </q-tab-panel>
        <q-tab-panel name="tabData">
          <vue-json-pretty
            :data="settings.settings"
            :deep="5"
          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div v-else>
      <!-- Rendering for production just renders the block and proxies the events -->
      <component
        :is="`smart-block-${settings.name}`"
        @action="processAction"
        @change="processChange"
        @config="processConfig"
        :settings="settings.settings"
      />
    </div>
  </div>
</template>
<script>
import Draggable from 'vuedraggable'
import VueJsonPretty from 'vue-json-pretty'

// TODO: Move these externally and compile them from the apps service...
import SmartBlockSurvey from 'components/SmartBlocks/Survey'
import SmartBlockAction from 'components/SmartBlocks/Action'
import SmartBlockAd from 'components/SmartBlocks/Ad'
import SmartBlockApp from 'components/SmartBlocks/App'
import SmartBlockThing from 'components/SmartBlocks/Thing'
import SmartBlockProduct from 'components/SmartBlocks/Product'
import SmartBlockMarkdown from 'components/SmartBlocks/Markdown'
import SmartBlockIframe from 'components/SmartBlocks/Iframe'

export default {
  name: 'RenderSmartBlock',
  props: {
    settings: Object,
    preview: Boolean
  },
  data () {
    return {
      currentTab: 'tabPreview'
    }
  },
  components: {
    Draggable,
    VueJsonPretty,
    SmartBlockSurvey,
    SmartBlockAction,
    SmartBlockThing,
    SmartBlockApp,
    SmartBlockAd,
    SmartBlockProduct,
    SmartBlockMarkdown,
    SmartBlockIframe
  },
  methods: {
    deleteMe () {
      this.$emit('delete')
    },
    processChange (data) {
      this.debug('change', data)
      this.$emit('change', data)
    },
    processConfig (data) {
      this.debug('config', data)
      this.$emit('config', data)
    },
    processAction (data) {
      this.debug('action', data)
      this.$emit('action', data)
    }
  }
}
</script>

<template>
  <div
    class="q-ma-sm"
    style="border-radius: 8px;"
  >
    <q-card
      v-if="preview"
      flat
      bordered
      :class="`bg-${settings.color} text-white q-pa-xs`"
      style="border-radius: 8px;"
    >
      <!-- Rendering for preview does a lot of stuff -->
      <q-toolbar class="bg-white text-black">
        {{ settings.title }}
        <q-space />
        <q-tabs
          v-model="currentTab"
          shrink
        >
          <q-tab
            name="tabPreview"
            label="Preview"
            class="bg-white text-black"
          />
          <q-tab
            name="tabSettings"
            label="Settings"
            class="bg-white text-black"
          />
          <q-tab
            name="tabData"
            label="Data"
            class="bg-white text-black"
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
      <q-tab-panels :value="currentTabPanel">
        <q-tab-panel
          name="tabComponent"
          class="q-pa-sm text-black"
          style="margin-top:10px;padding:0px; background-color: rgba(255, 255, 255, 1); border-radius: 8px;"
        >
          <component
            class="q-pa-md"
            :is="`smart-block-${settings.name}`"
            @action="processAction"
            @change="processChange"
            @config="processConfig"
            :settings="settings.settings"
            :configure="configureMode"
          />
        </q-tab-panel>
        <q-tab-panel
          name="tabData"
          class="q-pa-sm text-black"
          style="margin-top:10px;padding:0px; background-color: rgba(236, 240, 241, 0.8); border-radius: 8px;"
        >
          <vue-json-pretty
            :data="settings.settings"
            :deep="5"
            class="q-pa-md q-mx-sm text-black"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
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
  computed: {
    currentTabPanel () {
      if (this.currentTab === 'tabData') return 'tabData'
      else return 'tabComponent'
    },
    configureMode () {
      return this.currentTab === 'tabSettings'
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

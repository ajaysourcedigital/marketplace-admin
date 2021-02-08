<template>
  <q-layout
    view="hHh LpR fFf"
    class=""
    style="background-color: rgba(236, 240, 241, 1);"
  >
    <!-- The header -->
    <q-header
      elevated
      class="bg-white text-grey-8"
    >
      <q-toolbar class="GNL__toolbar">
        <!-- Menu button -->
        <q-btn
          v-if="user.role"
          flat
          dense
          round
          @click="miniState = !miniState"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
          style="color: #011924"
        />

        <!-- Logo -->
        <q-toolbar-title
          v-if="$q.screen.gt.xs"
          shrink
          class="row items-center no-wrap"
        >
          <q-img
            src="https://storage.googleapis.com/cdn.sourcesync.io/media/0a3ef908-0b1b-4bdc-bcf1-5debe4c750d3.png"
            @click="$bus.emit('route', '')"
            style="width: 90px"
            contain
          />
        </q-toolbar-title>

        <q-space />

        <!-- Right buttons -->
        <div
          v-if="user.role"
          class="row items-center no-wrap relative-position"
        >
          <!-- Search box -->
          <search-box />

          <q-btn
            flat
            no-caps
            class="user-name"
            @click="processAction({ action: 'app.route', payload: 'account'})"
          >
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div
              class="q-ml-sm ellipsis"
              style="max-width: 95px"
            >
              {{ user_details.name }}
            </div>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
        <div v-else>
          <q-btn
            round
            dense
            flat
            style="color: #011924"
            icon="login"
            @click="$bus.emit('route', 'login')"
          >
            <q-tooltip>Login</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Menu -->
    <q-drawer
      v-if="user.role"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      persistent
      :mini="miniState"
      content-class="GNL__drawer hide-scrollbar"
      :width="280"
    >
      <q-list
        padding
        class="text-grey-8 q-pt-md transparent"
      >
        <!-- Menu items -->
        <div
          v-for="(link, index) in settings.menu.links"
          :key="index"
        >
          <q-separator
            v-if="link.type === 'separator'"
            inset
            class="q-my-sm"
            style="height: 0.5px"
          />
          <q-item v-else-if="link.type === 'button'">
            <q-btn
              :rounded="!miniState"
              :round="miniState"
              :icon="link.icon"
              color="link.color"
              class=""
              :label="miniState?'':link.text"
            />
          </q-item>
          <q-item
            v-else-if="link.type === 'button-dropdown'"
            class="GNL__drawer-button-dropdown q-mb-md"
          >
            <q-btn-dropdown
              padding="0 5px"
              :color="link.color"
              class="text-white icon-none createButton"
              :class="miniState?'':'q-pr-md'"
              :content-style="{ backgroundColor: '#ffffff' }"
              style="background-color: #1a8cc1; border-radius: 10px;"
              no-caps
            >
              <template v-slot:label>
                <div class="row items-center no-wrap">
                  <q-icon
                    left
                    :name="link.icon"
                  />
                  <div
                    class="text-center"
                    :class="miniState?'':'q-ml-sm'"
                  >
                    {{ miniState?null:link.text }}
                  </div>
                </div>
              </template>
              <div
                style="width:300px;border-radius: 10px;"
                class="row no-wrap q-mb-sm justify-around"
              >
                <q-card
                  v-for="(item, i) in link.list"
                  :key="i"
                  clickable
                  v-close-popup
                  @click="processAction({ action: link.action, payload: item.value})"
                  style="border-radius: 10px; min-width: 90px; background-color: rgba(255, 255, 255, 1);"
                  class="column items-center q-pa-xs q-mt-sm cardhover"
                >
                  <img
                    contain
                    class=""
                    style="width:70px; border-radius: 10px;"
                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                  >
                  <div class="text-subtitle1">
                    {{ item.text }}
                  </div>
                </q-card>
              </div>
            </q-btn-dropdown>
          </q-item>
          <q-item
            v-else
            class="GNL__drawer-item"
            v-ripple
            clickable
            @click="processAction(link)"
          >
            <q-item-section avatar>
              <q-icon
                :name="link.icon"
                color="grey-8"
                :class="link.color"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-grey-8">
                {{ link.text }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <!-- Route -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- FAB -->
    <q-page-sticky
      v-if="$q.screen.lt.sm"
      position="bottom-right"
      :offset="[10,10]"
    >
      <q-btn
        round
        icon="add"
        direction="up"
        color="accent"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>
import searchBox from '../components/searchBox'
export default {
  name: 'LayoutSimple',
  components: {
    searchBox
  },
  data () {
    return {
      settings: this.$store.state.app.settings,
      user: this.$store.state.user,
      updates: [],
      leftDrawerOpen: true,
      miniState: false,
      search: '',
      user_details: {}
    }
  },
  mounted () {
    this.$axios.get(`${this.$store.state.system.api.base}/updates/by-app/sourcesync-admin`, { headers: { Authorization: `Bearer ${this.user.jwt}` } })
      .then(response => {
        this.updates = response.data
        this.debug('DATA', response.data)
      })
      .catch(response => {
        this.debug('CRAP', response)
      })
  },
  methods: {
    processAction (link) {
      this.debug(`Processing action ${link.action} (${link.payload})`)
      this.$bus.emit(link.action, link.payload)
    }
  },
  beforeMount () {
    this.user_details = (({ username, id, name, email, address, city, state, country, zip, photo }) => ({ username, id, name, email, address, city, state, country, zip, photo }))(this.$store.state.user)
  }
}
</script>

<style>

.q-menu {
  border-radius: 10px;
  padding-left: 3px;
  padding-right: 5px;
}

.cardhover:hover {
  bottom: 3px;
  right: 2px;
  box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.3);
  }

.GNL__toolbar {
  height: 64px;
}

.GNL__drawer-item {
  line-height: 24px;
  color: rgba(255,255,255,0.4);
  margin-right: 10px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.GNL__drawer-item:hover {
  background: rgba(26, 140, 193, 0.3);
  margin-right: 10px;
  color: white;
}

.GNL__drawer-item .q-item__section--avatar .q-icon {
  color: #5f6368;
}

.GNL__drawer-item .q-item__label {
  color: #808080;
  letter-spacing: 0.01785714em;
  font-size: 0.875rem;
  font-weight: 500;
}

.GNL__drawer-button-dropdown {
    background-color: rgba(255,255,255,0.1);
}

.GNL__drawer-button-dropdown .q-btn-dropdown--simple .q-btn-dropdown__arrow {
  margin: 0px !important;
}

.GNL__drawer {
  background-color: rgba(255,255,255,1);
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 10px;
}

.icon-none .q-btn-dropdown__arrow-container {
  display: none;
}

.q-drawer {
  background-color: rgba(236, 240, 241, 1);
  max-height: 100vh;
  margin-bottom: 25px;
}

.q-drawer--left.q-drawer--bordered {
  border-right: none;
}

.icon-none .on-left {
  margin-right: 0;
}

.user-name .q-btn__content {
  flex-wrap: nowrap;
}
</style>

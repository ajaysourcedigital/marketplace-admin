<template>
  <q-layout
    view="hHh LpR fFf"
    class="bg-grey-1"
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
            :src="settings.logo.wide"
            @click="$bus.emit('route', '')"
            style="width: 110px"
            contain
          />
        </q-toolbar-title>

        <q-space />

        <!-- Search box -->
        <search-box />

        <q-space />

        <!-- Right buttons -->
        <div
          v-if="user.role"
          class="q-gutter-sm row items-center no-wrap"
        >
          <q-btn
            round
            dense
            flat
            style="color: #011924"
            icon="chat"
            class="q-mx-sm"
            @click="processAction({ action: 'app.live' })"
          >
            <q-tooltip>Chat</q-tooltip>
          </q-btn>

          <q-btn
            round
            dense
            flat
            style="color: #011924"
            class="q-mx-sm"
            @click="processAction({ action: 'app.route', payload: 'updates'})"
          >
            <q-avatar>
              <q-img
                style="width: 20px"
                src="../../public/icons/bullhorn.png"
                contain
              />
            </q-avatar>

            <q-badge
              v-if="updates"
              color="red"
              text-color="white"
              floating
            >
              {{ updates.length }}
            </q-badge>
            <q-tooltip>Updates</q-tooltip>
          </q-btn>

          <q-btn
            round
            dense
            flat
            style="color: #011924"
            icon="support_agent"
            class="q-mx-sm"
            @click="processAction({ action: 'app.support' })"
          >
            <q-badge
              v-if="user.conversations"
              color="red"
              text-color="white"
              floating
            >
              {{ user.messages.length }}
            </q-badge>
            <q-tooltip>Help</q-tooltip>
          </q-btn>

          <q-btn
            flat
            no-caps
            class="q-mx-sm"
            @click="processAction({ action: 'app.route', payload: 'account'})"
          >
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="q-ml-sm">
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
      :mini="miniState"
      content-class="GNL__drawer"
      :width="280"
    >
      <q-list
        padding
        class="text-grey-8 q-pt-md"
      >
        <!-- Menu items -->
        <div
          v-for="(link, index) in settings.menu.links"
          :key="index"
        >
          <q-separator
            v-if="link.type === 'separator'"
            inset
            class="q-my-sm bg-white"
            style="height: 0.5px"
          />
          <q-item v-else-if="link.type === 'button'">
            <q-btn
              :rounded="!miniState"
              :round="miniState"
              :icon="link.icon"
              color="link.color"
              class="text-grey-8"
              :label="miniState?'':link.text"
            />
          </q-item>
          <q-item
            v-else-if="link.type === 'button-dropdown'"
            class="GNL__drawer-button-dropdown"
          >
            <q-btn-dropdown
              padding="10px"
              :color="link.color"
              class="text-white icon-none "
              :class="miniState?'':'q-pr-md'"
              style="background-color: #1a8cc1"
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
              <q-list>
                <q-item
                  v-for="(item, i) in link.list"
                  :key="i"
                  clickable
                  v-close-popup
                  @click="processAction({ action: link.action, payload: item.value})"
                >
                  <q-item-section>
                    <q-item-label>{{ item.text }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
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
                :class="link.color"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">
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
.GNL__toolbar {
  height: 64px;
}

.GNL__drawer-item {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
}

.GNL__drawer-item .q-item__section--avatar .q-icon {
  color: #5f6368;
}

.GNL__drawer-item .q-item__label {
  color: #3c4043;
  letter-spacing: 0.01785714em;
  font-size: 0.875rem;
  font-weight: 500;
}
.GNL__drawer-button-dropdown .q-btn-dropdown--simple .q-btn-dropdown__arrow {
  margin-left: 0px !important;
}

.GNL__drawer {
  background-color: #011924;
  border-radius: 4px;
}

.icon-none .q-btn-dropdown__arrow-container {
  display: none;
}

.q-drawer {
  background-color: #fafafa;
}

.q-drawer--left.q-drawer--bordered {
  border-right: none;
}

.icon-none .on-left {
  margin-right: 0;
}
</style>

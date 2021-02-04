<template>
  <div
    class="search-bar"
    :class="{ 'open': search }"
  >
    <div
      class="search-bar-form"
      @click="getOpen()"
    >
      <q-input
        class="GNL__toolbar-input search-bar-input cursor-pointer"
        rounded
        borderless
        dense
        v-model="searchInput"
        color="bg-grey-7"
        :placeholder="search ? $t('search.bar.text') : ''"
      >
        <template v-slot:append>
          <q-icon
            style="color: #011924"
            v-if="searchInput === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchInput = ''"
          />
        </template>
      </q-input>
    </div>

    <transition name="fade">
      <div
        class="q-mt-sm row justify-center q-gutter-lg relative-position"
        style="height: 85vh;overflow-y: auto;"
        v-if="search"
      >
        <div
          class="col-lg-3 col-md-3 col-sm-5 col-xs-11"
          v-for="(row, index) in rows"
          :key="index"
        >
          <div class="q-mb-md text-h6">
            {{ row.name }}
          </div>

          <q-card
            v-for="(item, i) in row.info"
            :key="i"
            class="q-mb-md"
          >
            <q-item
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="item.image">
                </q-avatar>
              </q-item-section>

              <q-item-section>{{ item.text }}</q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </transition>

    <span
      class="search-bar-close"
      @click="closeForm()"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      searchInput: '',
      rows: [
        {
          name: 'Content',
          info: [
            {
              image: 'https://cdn.quasar.dev/img/avatar5.jpg',
              text: 'Rachel Smith'
            },
            {
              image: 'https://cdn.quasar.dev/img/boy-avatar.png',
              text: 'Peter Finlan'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar6.jpg',
              text: 'Ideas for Hovering effects'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar3.jpg',
              text: 'Ideas for Hovering effects'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar4.jpg',
              text: 'Ideas for Hovering effects'
            }
          ]
        },
        {
          name: 'Meta content',
          info: [
            {
              image: 'https://cdn.quasar.dev/img/avatar.png',
              text: 'Page preloading effect'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar2.jpg',
              text: 'Ideas for Hovering effects'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar4.jpg',
              text: 'Ideas for Hovering effects'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar1.jpg',
              text: 'Ideas for Hovering effects'
            }
          ]
        },
        {
          name: 'Other',
          info: [
            {
              image: 'https://cdn.quasar.dev/img/boy-avatar.png',
              text: 'Tooltip style'
            },
            {
              image: 'https://cdn.quasar.dev/img/avatar.png',
              text: 'Tab style'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getOpen: function () {
      this.search = 'open'
    },
    closeForm: function () {
      this.search = ''
      this.searchInput = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  display: none;
}

.search-bar {
  width: 25px;
  min-height: 35px;
  position: absolute;
  z-index: 10000;
  top: 0;
  right: 102%;
  // margin: 0;
  transform-origin: 100% 0;
  transition-property: min-height, width, top, right, background;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

  &:before {
    content: '';
    position: absolute;
    width: 35px;
    height: 35px;
    display: block;
    background-color: #E8EAEB;
    border-radius: 50%;
    top: 0;
    right: -4px;
    opacity: 0;
    transition: all 0.3s;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }

  .q-icon {
    margin-left: -5px;
    margin-bottom: 2px;
    transition-property: font-size;
    transition-duration: 0.5s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
  }

  /deep/.q-field--outlined .q-field__control:before {
    border: none;
  }

  &.open {
    width: 100vw;
    background: #f1f1f1;
    min-height: 101vh;
    top: -10px;
    right: -13px;
    margin: 0;

    .search-bar-form {
      width: 80%;
      height: auto;
      margin-bottom: 40px;
      transform: translate3d(0, 3em, 0);
      color: #ec5a62;
    }

    .search-bar-input {
      font-size: 6em;
    }

    /deep/.q-field__control {
      height: auto;

      &:before {
        border: none;
      }
    }

    /deep/.q-field__append {
      height: auto;
    }

    .q-icon {
      font-size: 4em;
      cursor: default;
      margin: 0;
    }

    .search-bar-close {
      opacity: 1;
      pointer-events: auto;
      transform: scale3d(1, 1, 1);
      transition: opacity 0.3s, transform 0.3s;
      transition-delay: 0.5s;
    }
  }
}

.search-bar-input {
  transition: font-size 0.5s cubic-bezier(0.7, 0, 0.3, 1);

  /deep/.q-field__native {
    color: #ec5a62;

    &::placeholder {
      color: #c2c2c2;
    }
  }
}

.search-bar-form {
  width: 100%;
  height: 35px;
  margin: 0 auto;
  position: relative;
  border-radius: 50%;
  transition-property: width, height, transform;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.search-bar-close {
  width: 27px;
  height: 27px;
  position: absolute;
  right: 1em;
  top: 1em;
  overflow: hidden;
  text-indent: 100%;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  transform: scale3d(0, 0, 1);

  &::before, &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    left: 50%;
    border-radius: 3px;
    opacity: 0.2;
    background: #000;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }

  &:hover {
    &::before, &::after {
      opacity: 1;
    }
  }
}

@media only screen and (max-width: 720px) {
  .search-bar {
    &.open {
      .search-bar-input {
        font-size: 3em;
      }

      .q-icon {
        font-size: 2em;
      }
    }
  }
}
</style>

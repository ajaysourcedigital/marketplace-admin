<template>
  <q-page
    fit
    class="q-pa-md"
    style=""
  >
    <div
      class="row q-mt-xs q-gutter-x-md"
      group="columns"
    >
      <div class="col-3 ">
        <q-card
          style="border-radius: 10px;"
          class="q-pa-sm custom_bg"
        >
          <q-item
            style="cursor: move;"
            class="text-white q-pa-sm rounded-borders"
          >
            <q-item-section class="text-h6 text-weight-bolder text-color">
              Available
            </q-item-section>
            <q-item-section avatar>
              <q-icon
                name="more_vert"
                class="cursor-pointer"
              >
                <q-menu
                  transition-show="fade"
                  transition-hide="fade"
                >
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Import...</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="rtData.available"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in rtData.available"
                :key="index"
                class="rounded-borders q-my-md q-ma-sm activation-card"
                style="border-radius: 10px;"
                @mouseover="$set(task_selected_index,'planned',index)"
                @mouseleave="task_selected_index.planned = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">{{ item.label }}
                      <q-icon
                        filled
                        size="xs"
                        name="close"
                        class="absolute-top-right q-mr-md q-mt-xs text-red"
                        v-if="index==task_selected_index.planned"
                        @click="deleteTask('available', task_selected_index.planned)"
                      />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-chip
                    dense
                    v-for="(tag, tagIndex) in item.tags"
                    :key="tagIndex"
                    :color="tag.color"
                    text-color="white"
                  >
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-8">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card
              class="full-width"
              v-if="add_model.planned"
            >
              <q-card-section>
                <div class="text-h6">
                  Add
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input
                  dense
                  v-model="add_data.planned.title"
                  label="Title"
                  outlined
                />
                <q-input
                  dense
                  class="q-mt-sm"
                  v-model="add_data.planned.label"
                  label="Label"
                  outlined
                />
                <q-input
                  dense
                  class="q-mt-sm"
                  v-model="add_data.planned.description"
                  label="Description"
                  outlined
                />
              </q-card-section>
              <q-card-actions
                align="right"
                class="q-pa-sm text-grey-8"
              >
                <q-btn
                  label="Add"
                  color="indigo-5"
                  class="text-capitalize"
                />
                <q-btn
                  label="Cancel"
                  color="primary"
                  class="text-capitalize"
                  @click="add_model.planned=false"
                />
              </q-card-actions>
            </q-card>
            <q-item v-else>
              <q-btn
                icon="add"
                rounded
                flat
                label="Add"
                @click="add_model.planned=true"
              />
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>

      <div class="col-3">
        <q-card
          style="border-radius: 10px;"
          class="q-pa-sm custom_bg2"
        >
          <q-item
            style="cursor: move;"
            class="q-pa-none text-white q-pa-sm"
          >
            <q-item-section class="text-h6 text-weight-bolder text-color">
              Scheduled
            </q-item-section>
            <q-item-section avatar>
              <q-icon
                name="more_vert"
                class="cursor-pointer"
              >
                <q-menu
                  transition-show="fade"
                  transition-hide="fade"
                >
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              :list="rtData.scheduled"
              group="tasks"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in rtData.scheduled"
                :key="index"
                class="rounded-borders q-my-md q-ma-sm activation-card"
                style="border-radius: 10px;"
                @mouseover="task_selected_index.wip = index"
                @mouseleave="task_selected_index.wip = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">{{ item.label }}
                      <q-icon
                        filled
                        size="xs"
                        name="close"
                        class="absolute-top-right q-mr-md q-mt-xs text-red"
                        v-if="index==task_selected_index.wip"
                        @click="deleteTask('scheduled', task_selected_index.wip)"
                      />
                    </span>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-sm">
                  <q-chip
                    dense
                    v-for="(tag, tagIdx) in item.tags"
                    :key="tagIdx"
                    :color="tag.color"
                    text-color="white"
                  >
                    {{ tag.name }}
                  </q-chip>
                </q-card-section>
                <q-card-section class="q-pa-sm text-grey-8">
                  {{ item.description }}
                </q-card-section>
              </q-card>
            </draggable>

            <q-card
              class="full-width"
              v-if="add_model.wip"
            >
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <q-input
                  dense
                  v-model="add_data.wip.title"
                  label="Title"
                  outlined
                />
                <q-input
                  dense
                  class="q-mt-sm"
                  v-model="add_data.wip.label"
                  label="Label"
                  outlined
                />
                <q-input
                  dense
                  class="q-mt-sm"
                  v-model="add_data.wip.description"
                  label="Description"
                  outlined
                />
              </q-card-section>
              <q-card-actions
                align="right"
                class="q-pa-sm text-grey-8"
              >
                <q-btn
                  label="Add"
                  color="indigo-5"
                  class="text-capitalize"
                />
                <q-btn
                  label="Cancel"
                  color="primary"
                  class="text-capitalize"
                  @click="add_model.wip=false"
                />
              </q-card-actions>
            </q-card>
          </q-scroll-area>
        </q-card>
      </div>

      <div class="col">
        <q-card
          style="border-radius: 10px;"
          class="q-pa-sm custom_bg3"
        >
          <q-item
            style="cursor: move;"
            class="q-pa-none text-white q-pa-sm"
          >
            <q-item-section class="text-h6 text-weight-bolder text-color">
              Live view
            </q-item-section>
            <q-item-section avatar>
              <q-icon
                name="more_vert"
                class="cursor-pointer"
              >
                <q-menu
                  transition-show="fade"
                  transition-hide="fade"
                >
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 1</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Option 2</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>
          <div
            style="border-radius: 10px;"
            class="q-pa-md q-pb-md q-ma-sm bg-grey-2"
          >
            {{ rtData }}
          </div>

          <!--
          <iframe
            style="width: 100%; height: 785px"
            src="https://experience.sourcesync.io/cheval"
          />
          -->
        </q-card>
      </div>
    </div>
    <q-resize-observer @resize="onResize" />
  </q-page>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'

Vue.component('draggable', draggable)
export default {
  name: 'PageLive',
  mounted () {
    console.log(this.realtime)
    this.rtDB.set({
      available: [
        {
          title: 'Buy milk',
          label: '15 mins',
          tags: [{ name: 'Error', color: 'negative' }, { name: 'Warning', color: 'warning' }],
          description: '2 Gallons of milk at the Deli store'
        },
        {
          title: 'Dispose Garbage',
          label: '10 mins',
          tags: [{ name: 'Info', color: 'info' }, { name: 'Success', color: 'positive' }],
          description: 'Sort out recyclable and waste as needed'
        },
        {
          title: 'Clean House',
          label: '30 mins',
          tags: [{ name: 'Error', color: 'negative' }, { name: 'Success', color: 'positive' }],
          description: 'Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses'
        },
        {
          title: 'Go Trekking',
          label: '30 mins',
          tags: [{ name: 'Info', color: 'info' }, { name: 'Success', color: 'positive' }, {
            name: 'Info',
            color: 'info'
          }, { name: 'Success', color: 'positive' }, { name: 'Info', color: 'info' }, {
            name: 'Success',
            color: 'positive'
          }],
          description: 'Completed 10km on cycle'
        }
      ],
      scheduled: [
      ]
    })
    this.rtDB.on('value', (snapshot) => {
      this.rtData = snapshot.val()
      console.log(this.rtData)
    })
  },
  data () {
    return {
      rtData: {},
      rtDB: window.firebase.database().ref('apps/sourcesync-admin/test'), // this.$fb.database().ref('apps/sourcesync-admin'),
      task_selected_index: {
        blocked: null,
        completed: null,
        planned: null,
        wip: null
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      add_model: {
        blocked: false,
        completed: false,
        planned: false,
        wip: false
      },
      add_data: {
        blocked: {},
        completed: {},
        planned: {},
        wip: {}
      },
      size: {},
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    getHeight () {
      return this.size.height - 90 + 'px'
    }
  },
  watch: {
    rtData: {
      handler (v) {
        if (!this.rtData.available) this.rtData.available = []
        if (!this.rtData.scheduled) this.rtData.scheduled = []
        this.rtDB.set(this.rtData)
      },
      deep: true
    }
  },
  methods: {
    onResize (size) {
      this.size = size
    },
    deleteTask (name, index) {
      if (name === 'available') {
        this.rtData.available.splice(index, 1)
      }
      if (name === 'scheduled') {
        this.rtData.scheduled.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.custom_bg {
  background-color: rgba(1, 25, 36, 0.7);
}

.custom_bg2 {
  background-color: rgba(1, 25, 36, 0.7);
}

.custom_bg3 {
  background-color: rgba(1, 25, 36, 0.7);
}

.custom_bg4 {
  background-color: rgba(1, 25, 36, 0.7);
}

.text-color {
  color: white;
}

.activation-card:hover {
  box-shadow: 1px 1px 1px rgba(108, 122, 137, 1);
  bottom: 2px;
  right: 2px;
}
</style>

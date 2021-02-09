<template>
  <q-card
    class="column no-wrap justify-between list-card"
    v-if="fullData"
  >
    <q-card-section class="text-h6 q-pb-none row no-wrap items-baseline">
      <q-item class="col-8">
        <q-item-section
          avatar
          class=""
        >
          <q-icon
            color="blue"
            :name="fullData.icon"
            size="44px"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <div class="text-h6">
              {{ fullData.header }}
            </div>
          </q-item-label>
          <q-item-label
            caption
            class="text-black"
          >
            {{ fullData.subheader }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <div class="col-4 row justify-end">
        <div>
          <q-btn
            round
            flat
            :icon="card ? 'list' : 'view_module'"
            @click="card = !card"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <q-table
        table-style="max-height: 75vh"
        class="stickyTable"
        :data="validation"
        :grid="card"
        :pagination="initialPagination"
        :visible-columns="visibleColumns"
        row-key="name"
        selection="multiple"
        :selected.sync="selected"
        @row-click="(evt, row, index) => $emit('row-click', evt, row, index)"
      >
        <!-- List view -->
        <template
          v-slot:header="props"
          v-if="!card"
        >
          <q-tr :props="props">
            <q-th />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            class="cursor-pointer"
            auto-width
            :class="props.expand ? 'active-row' : ''"
            @click="$emit('row-click', props.row)"
          >
            <q-td
              class="relative-position"
              @mouseover="props.expand = true"
              @mouseleave="props.expand = false"
            >
              <q-avatar
                square
                size="xl"
              >
                <q-img
                  :ratio="1"
                  :src="props.row.media ? `https://img.youtube.com/vi/${props.row.media}/0.jpg` : 'https://via.placeholder.com/150?text=N/A'"
                />
              </q-avatar>
              <span
                v-show="props.expand"
                :props="props"
                class="extra-buttons q-pl-md row items-center"
              >
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="edit"
                />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="analytics"
                  class="q-mx-sm"
                />
                <q-btn
                  round
                  flat
                  color="grey"
                  icon="chat"
                  class="q-mr-sm"
                />
                <q-btn-dropdown
                  fab-mini
                  flat
                  color="grey"
                  dropdown-icon="more_vert"
                  @click.stop="props.expand = true"
                  @mouseover="props.expand = true"
                >
                  <q-list @mouseover="props.expand = true">
                    <q-item
                      clickable
                      v-close-popup
                      v-for="(item, i) in dropdownMenu"
                      :key="i"
                    >
                      <q-item-section
                        avatar
                        class="q-pr-none"
                      >
                        <q-icon
                          :name="item.icon"
                          color="grey"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ item.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </span>
            </q-td>

            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="max-width:200px;"
            >
              <div
                class="ellipsis"
                v-if="typeItem(col.value)"
              >
                {{ col.value || 'N/A' }}
                <q-popup-edit
                  v-if="edit"
                  auto-save
                  v-model="props.row[col.name]"
                  @save="$emit('saved', props.row[col.name], props.row, col.label)"
                >
                  <editInPlace
                    :props="props"
                    :col="col"
                  />
                </q-popup-edit>
              </div>
              <div v-else>
                <!-- If object has more than 3 items -->
                <q-btn
                  icon="add"
                  round
                  color="primary"
                  @click.stop="expandRow(props, col)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
        <!-- Default | Card view -->
        <template
          v-slot:item="props"
          v-if="card"
        >
          <content-card
            :props="props"
            @row-click="$emit('row-click', props.row)"
          />
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
import editInPlace from './EditInPlace'
import contentCard from './contentCard'
export default {
  name: 'QResources',
  props: {
    data: { type: Array, default: null },
    schema: { type: Object, default: null },
    edit: { type: Boolean, default: false },
    sticky: { type: Boolean, default: true },
    fullData: { type: Object, default: null }
  },
  components: { editInPlace, contentCard },
  data () {
    return {
      card: true,
      row: null,
      selected: [],
      active: false,
      visibleColumns: ['id', 'name', 'creator', 'created_at', 'updated_at', 'title', 'type', 'media', 'cover', 'slug', 'CREATED_BY', 'UPDATED_BY', 'mediatype', 'mediaid', 'mediafile'],
      dropdownMenu: [
        {
          icon: 'edit',
          label: 'Edit title and descriprion'
        },
        {
          icon: 'share',
          label: 'Get shareble link'
        },
        {
          icon: 'campaign',
          label: 'Promote'
        },
        {
          icon: 'get_app',
          label: 'Download'
        },
        {
          icon: 'delete',
          label: 'Delete forever'
        }
      ],
      initialPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 8
      }
    }
  },
  methods: {
    typeItem (e) {
      if (typeof e === 'object' && e !== null && Object.keys(e).length < 3) return true
      else if (typeof e !== 'object') return true
      else if (e === null || e === '') return true
      else return false
    },
    expandRow (props, col) {
      props.expand = !props.expand
      this.row = col.value
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  },
  computed: {
    validate () {
      return ajv.compile(this.schema)
    },
    // validate items and pushes them to a list
    validation () {
      const list = []
      this.data.forEach(item => {
        const valid = this.validate(item)
        if (!valid) this.$emit('error', this.validate.errors, item)
        else list.push(item)
      })
      return list
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-card {
  flex-grow: 1;
  height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.items-baseline {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 9;
}

.stickyTable {
  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: #fff;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:last-child th {
    top: 48px;
  }

  thead tr:first-child th {
    top: 0;
  }
}

/deep/.q-expansion-item .q-item {
  padding: 0px;
}

.active-row {
  background: #F7F7F7;

  /deep/td:before {
    background: none;
  }
}

.extra-buttons {
  width: 260px;
  position: absolute;
  z-index: 99;
  background-color: #F7F7F7;
  top: 50%;
  bottom: 0;
  left: 100%;
  transform: translateY(-50%);
  height: 100%;

  /deep/.q-btn-dropdown--simple .q-btn-dropdown__arrow {
    margin-left: 0;
  }
}
</style>

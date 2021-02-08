<template>
  <div
    class="column no-wrap justify-start hide-scrollbar"
    :class="card ? ' list-card ' : ''"
    v-if="fullData"
  >
    <q-card-section
      style="background-color: rgba(236, 240, 241, 1);"
      class="q-mx-sm q-px-sm text-h6 q-pb-md row no-wrap items-baseline"
    >
      <q-item class="col-8 q-py-none">
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
    <q-card-section class="q-pa-md q-ma-none">
      <q-table
        table-style="max-height: 75vh"
        class="stickyTable q-ml-sm text-h6"
        style="border-radius: 8px;"
        :data="validation"
        :columns="columns"
        :grid="card"
        hide-bottom
        virtual-scroll
        :rows-per-page-options="[0]"
        wrap-cells
      >
        <!-- List view -->
        <template #header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              auto-width
              class="bg-grey-2 ellipsis text-capitalize"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template #body="props">
          <q-tr
            :props="props"
            class="cursor-pointer"
            @click="$emit('row-click', props.row)"
          >
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="max-width:200px;"
            >
              <div v-if="col.name !== 'display'">
                <div
                  class="ellipsis"
                  v-if="!isObject(col.value)"
                >
                  {{ colValue(col.value) || 'N/A' }}
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
              </div>
              <!-- Img -->
              <div v-else>
                <q-avatar
                  square
                  size="xl"
                >
                  <q-img
                    :ratio="1"
                    :src="props.row.cover ? props.row.cover : notAvailable"
                  />
                </q-avatar>
              </div>
            </q-td>
          </q-tr>
          <!-- Expand -->
          <q-tr
            v-show="props.expand"
            :props="props"
          >
            <q-td colspan="100%">
              <v-jsoneditor
                v-if="find(rows, { id: props.row.id })"
                :value="props.row[find(rows, { id: props.row.id }).col]"
                :options="{ mode: 'preview' }"
                class="scroll"
                style="max-height:400px;"
              />
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
  </div>
</template>

<script>
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const moment = require('moment')
import { find } from 'lodash'
import VJsoneditor from 'v-jsoneditor'
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
  components: { editInPlace, contentCard, VJsoneditor },
  data () {
    return {
      find: find,
      notAvailable: require('../assets/not-available-sm.png'),
      card: true,
      rows: [],
      columns: [
        { name: 'display', required: true, label: 'Display', align: 'left', sortable: false },
        { name: 'name', required: true, label: 'Name', align: 'left', sortable: true, field: row => row.name, format: val => `${val}` },
        { name: 'slug', required: true, label: 'Slug', align: 'left', sortable: true, field: row => row.slug, format: val => `${val}` },
        { name: 'creator', required: true, label: 'Creator', align: 'left', sortable: true, field: row => row.creator, format: val => `${val}` },
        { name: 'type', required: true, label: 'type', align: 'left', sortable: true, field: row => row.type, format: val => `${val}` },
        { name: 'created_at', required: true, label: 'Created', align: 'left', sortable: true, field: row => row.created_at, format: val => `${val}` },
        { name: 'updated_at', required: true, label: 'Updated', align: 'left', sortable: true, field: row => row.updated_at, format: val => `${val}` },
        { name: 'settings', required: true, label: 'Settings', align: 'left', sortable: true, field: row => row.settings, format: val => val },
        { name: 'data', required: true, label: 'Data', align: 'left', sortable: true, field: row => row.data, format: val => val }
      ]
    }
  },
  methods: {
    // expands row, sets id and column name to be searched
    expandRow (props, col) {
      if (find(this.rows, { id: props.row.id })) {
        if (props.expand && find(this.rows, { id: props.row.id }).col === col.name) {
          props.expand = false
          this.rows = [...this.rows.filter(filt => filt.id !== props.row.id)]
        } else find(this.rows, { id: props.row.id }).col = col.name
      } else {
        this.rows.push({ id: props.row.id, col: col.name })
        props.expand = true
      }
    },
    // checks if prop value is timestamp
    colValue (val) {
      if (moment(val, moment.ISO_8601).isValid()) return moment(val).fromNow()
      // some values return null written as string...
      else if (val === 'null') return 'N/A'
      else return val
    },
    // checks if value contains object
    isObject (e) {
      if (typeof e === 'object' && e !== null) return true
      else return false
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
  height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.items-baseline {
  position: sticky;
  top: 0;
  background-color: rgb(255, 255, 255);
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
</style>

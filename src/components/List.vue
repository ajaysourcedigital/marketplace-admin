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
        :columns="genColumns"
        :grid="card"
        hide-bottom
        virtual-scroll
        :rows-per-page-options="[0]"
        wrap-cells
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
              class="text-uppercase ellipsis"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr
            :props="props"
            class="cursor-pointer"
            @click="$emit('row-click', props.row)"
          >
            <q-td>
              <q-avatar
                square
                size="xl"
              >
                <q-img
                  :ratio="1"
                  :src="props.row.image ? props.row.image : 'https://via.placeholder.com/150?text=N/A'"
                />
              </q-avatar>
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
                  :icon="expandIcon(props, col) ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  round
                  color="primary"
                  @click.stop="expandColumn(props, col.value, col)"
                />
              </div>
            </q-td>
          </q-tr>
          <q-tr
            v-show="props.expand"
            :props="props"
          >
            <q-td colspan="100%">
              <expansion-card
                :key="refreshKey"
                :prop="rows[props.rowIndex].items"
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
  </q-card>
</template>

<script>
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
import editInPlace from './resourceList/EditInPlace'
import contentCard from './contentCard'
import { uniq } from 'lodash'
import ExpansionCard from './resourceList/expansionCard.vue'
export default {
  name: 'QResources',
  props: {
    data: { type: Array, default: null },
    schema: { type: Object, default: null },
    edit: { type: Boolean, default: false },
    sticky: { type: Boolean, default: true },
    fullData: { type: Object, default: null }
  },
  components: { editInPlace, contentCard, ExpansionCard },
  data () {
    return {
      card: true,
      refreshKey: 0
    }
  },
  methods: {
    typeItem (e) {
      if (typeof e === 'object' && e !== null && Object.keys(e).length < 3) return true
      else if (typeof e !== 'object') return true
      else if (e === null || e === '') return true
      else return false
    },
    // checks if column exists in rows, adds/removes it -- refreshes expand card
    expandColumn (props, val, col) {
      let found = false
      if (this.rows[props.rowIndex].items.length > 0) {
        this.rows[props.rowIndex].items.forEach(column => {
          if (column.col === col.name) {
            this.rows[props.rowIndex].items = [...this.rows[props.rowIndex].items.filter(filt => filt.col !== col.name)]
            found = true
          }
        })
        if (!found) this.rows[props.rowIndex].items.push({ col: col.name, val })
      } else this.rows[props.rowIndex].items.push({ col: col.name, val })
      this.refreshKey += 1
      props.expand = this.rows[props.rowIndex].items.length > 0
    },
    // same as above, but only returns true or false
    expandIcon (props, col) {
      let icon = false
      if (this.rows[props.rowIndex].items.length > 0) {
        this.rows[props.rowIndex].items.forEach(column => {
          if (column.col === col.name) icon = true
        })
      }
      return icon
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
    },
    // generates rows to store expanded columns
    rows () {
      const row = []
      this.validation.forEach(e => {
        row.push({ id: e.id, items: [] })
      })
      return row
    },
    // generates columns from validated items' object keys
    genColumns () {
      const arr = []
      const columns = []
      this.validation.forEach(obj => {
        Object.keys(obj).forEach(key => {
          arr.push(key)
        })
      })
      const filtered = uniq(arr)
      filtered.forEach(name => {
        columns.push({
          name: name,
          label: name,
          required: true,
          align: 'left',
          field: name,
          format: val => val,
          sortable: true
        })
      })
      return columns
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
    top: 0;
  }
}
</style>

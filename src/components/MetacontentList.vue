<template>
  <q-card
    class="column no-wrap justify-between list-card"
    v-if="fullData"
  >
    <q-card-section class="text-h6 q-pb-none row no-wrap items-baseline">
      <q-item class="col-8">
        <q-item-section avatar>
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
      <!-- <div class="col-4 row justify-end">
        <div>
          <q-btn
            round
            flat
            :icon="card ? 'list' : 'view_module'"
            @click="card = !card"
          />
        </div>
      </div> -->
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <q-table
        table-style="max-height: 75vh"
        class="stickyTable"
        :data="validation"
        :columns="columns"
        hide-bottom
        virtual-scroll
        :rows-per-page-options="[0]"
        wrap-cells
        @row-click="(evt, row, index) => $emit('row-click', evt, row, index)"
      >
        <!-- List view -->
        <template #header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              auto-width
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template #body="props">
          <!-- Display -->
          <tr :props="props">
            <q-td key="display">
              <q-avatar size="xl">
                <q-img
                  :ratio="1"
                  :src="props.row.image ? props.row.image : 'https://via.placeholder.com/150?text=N/A'"
                />
              </q-avatar>
            </q-td>
            <!-- Name, Created, & Updated -->
            <q-td
              v-for="(col, index) in colNames"
              :key="index"
            >
              <div class="ellipsis">
                {{ colValue(props, col) }}
              </div>
            </q-td>
            <!-- Impressions, Engagements, Conversions, Distributions -->
            <q-td
              v-for="spark in sparks"
              :key="spark.name"
              @click.stop="expandRow(props, spark, spark.name)"
              class="cursor-pointer spark"
              :class="isActive(props, spark) ? 'active' : ''"
            >
              <sparkline
                class="fit"
                :indicator-styles="false"
              >
                <sparklineCurve
                  class="fit"
                  :data="Array.from(map(spark.data.map(obj => obj.stats)))"
                  :limit="spark.data.length"
                  :styles="spark.style"
                  :ref-line-styles="{ strokeOpacity: 0 }"
                />
              </sparkline>
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
              >
                {{ Math.max.apply(Math, spark.data.map(obj => obj.stats)) }}
              </q-tooltip>
            </q-td>
          </tr>
          <q-tr
            v-if="props.expand"
            class="bg-grey-3"
          >
            <q-td colspan="100%">
              <MetacontentStats :data="find(rows, { id: props.row.id }).items" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })
const moment = require('moment')
import { find, map } from 'lodash'
import sparkline from 'vue-sparklines'
import MetacontentStats from 'components/MetacontentStats'
// import editInPlace from './EditInPlace'
export default {
  name: 'QResources',
  props: {
    data: { type: Array, default: null },
    schema: { type: Object, default: null },
    edit: { type: Boolean, default: false },
    sticky: { type: Boolean, default: true },
    fullData: { type: Object, default: null }
  },
  components: {
    //   editInPlace
    sparkline,
    MetacontentStats
  },
  methods: {
    // expands row and sets data from impressions, engagements, conversions, or distributions
    expandRow (props, val, col) {
      if (find(this.rows, { id: props.row.id })) {
        if (props.expand && find(this.rows, { id: props.row.id }).items.col === col) {
          props.expand = false
          this.rows = [...this.rows.filter(filt => filt.id !== props.row.id)]
        } else {
          find(this.rows, { id: props.row.id }).items = { col: col, val }
        }
      } else {
        this.rows.push({ id: props.row.id, items: { col: col, val } })
        props.expand = true
      }
    },
    // checks if prop value is timestamp
    colValue (props, col) {
      const obj = find(props.cols, { name: col })
      let val
      if (obj.name === 'created_at' || obj.name === 'updated_at') val = moment(obj.value).fromNow()
      else val = obj.value
      return val
    },
    // sets active class for clicked spark
    isActive (props, spark) {
      const obj = find(this.rows, { id: props.row.id })
      let active = false
      if (obj) {
        active = obj.items.col === spark.name
      }
      return active
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
  },
  data () {
    return {
      card: true,
      find: find,
      map: map,
      rows: [],
      colNames: ['name', 'created_at', 'updated_at'],
      sparks: [
        {
          name: 'impressions',
          data: [
            {
              stats: 22,
              date: '2017-05-06T04:25:28'
            },
            {
              stats: 33,
              date: '2017-03-12T10:02:17'
            },
            {
              stats: 9,
              date: '2020-03-20T07:48:25'
            },
            {
              stats: 1,
              date: '2015-10-07T12:36:45'
            },
            {
              stats: 39,
              date: '2014-07-28T08:53:10'
            },
            {
              stats: 1,
              date: '2014-10-30T08:11:58'
            }
          ],
          style: {
            stroke: '#54a5ff',
            fill: '#000'
          }
        },
        {
          name: 'engagements',
          data: [
            {
              stats: 43,
              date: '2020-05-09T02:04:49'
            },
            {
              stats: 16,
              date: '2018-12-07T09:03:25'
            },
            {
              stats: 35,
              date: '2014-08-28T10:05:38'
            },
            {
              stats: 37,
              date: '2018-07-15T09:51:07'
            },
            {
              stats: 48,
              date: '2015-08-11T07:53:57'
            },
            {
              stats: 0,
              date: '2018-02-16T01:29:43'
            }
          ],
          style: {
            stroke: '#54a5ff',
            fill: '#000'
          }
        },
        {
          name: 'conversions',
          data: [
            {
              stats: 39,
              date: '2020-07-13T12:14:26'
            },
            {
              stats: 5,
              date: '2016-09-21T09:05:17'
            },
            {
              stats: 45,
              date: '2017-12-23T02:03:15'
            },
            {
              stats: 40,
              date: '2019-07-12T10:48:48'
            },
            {
              stats: 50,
              date: '2020-09-05T03:45:07'
            },
            {
              stats: 12,
              date: '2016-09-08T01:50:10'
            },
            {
              stats: 40,
              date: '2015-02-19T03:02:57'
            }
          ],
          style: {
            stroke: '#54a5ff',
            fill: '#000'
          }
        },
        {
          name: 'distributions',
          data: [
            {
              distributions: 'OPTYK',
              stats: 33,
              date: '2020-09-20T05:24:24'
            },
            {
              distributions: 'EMTRAC',
              stats: 22,
              date: '2018-12-09T10:34:43'
            },
            {
              distributions: 'KRAGGLE',
              stats: 55,
              date: '2015-12-28T04:37:46'
            },
            {
              distributions: 'CYTRAK',
              stats: 21,
              date: '2017-09-13T11:58:37'
            },
            {
              distributions: 'EXOTECHNO',
              stats: 77,
              date: '2020-08-12T05:09:41'
            }
          ],
          style: {
            stroke: '#54a5ff',
            fill: '#000'
          }
        }
      ],
      columns: [
        { name: 'display', required: true, label: 'Display', align: 'left', sortable: false },
        { name: 'name', required: true, label: 'Name', align: 'left', sortable: true, field: row => row.name, format: val => `${val}` },
        { name: 'created_at', required: true, label: 'Created', align: 'left', sortable: true, field: row => row.created_at, format: val => `${val}` },
        { name: 'updated_at', required: true, label: 'Updated', align: 'left', sortable: true, field: row => row.updated_at, format: val => `${val}` },
        { name: 'impressions', required: false, label: 'Impressions', align: 'left', sortable: false },
        { name: 'engagements', required: false, label: 'Engagements', align: 'left', sortable: false },
        { name: 'conversions', required: false, label: 'Conversions', align: 'left', sortable: false },
        { name: 'distributions', required: false, label: 'Distributions', align: 'left', sortable: false }
      ]
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

.active {
  background-color: $grey-3;
}

/deep/.spark .sparkline-wrap > svg {
  width: 100%;
}
</style>

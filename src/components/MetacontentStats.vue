<template>
  <div v-if="data">
    <div class="row no-wrap q-gutter-x-md">
      <div class="col-3 overflow-hidden">
        <q-list
          bordered
          separator
          class="bg-white full-width scroll"
          style="height:450px!important;"
        >
          <q-item-label
            header
            class="row justify-between text-capitalize"
          >
            <div>{{ data.col === 'distributions' ? 'Distributions' : 'Date' }}</div>
            <div
              v-if="data.col !== 'distributions'"
              class="text-capitalize"
            >
              {{ data.col }}
            </div>
          </q-item-label>
          <q-item
            clickable
            v-for="(items, index) in data.val.data"
            :key="index"
          >
            <q-item-section>
              {{ data.col === 'distributions' ? items.distributions : moment(items.date).format('L') }}
            </q-item-section>
            <q-item-section side>
              {{ items.stats }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-card
          square
          class="fit"
        >
          <q-card-section class="text-center">
            <div class="text-capitalize text-h5">
              {{ data.col }}
            </div>
            <div>
              Overall: {{ summary }}
            </div>
          </q-card-section>
          <q-card-section class="row no-wrap justify-center">
            <div class="column justify-between q-pr-md q-pt-md">
              <div>{{ Math.max.apply(Math, data.val.data.map(obj => obj.stats)) }}</div>
              <div>0</div>
            </div>
            <sparkline
              height="300"
              width="600"
              class="row justify-center q-pt-lg"
              style="border-left: 2px solid; border-bottom: 2px solid;"
            >
              <sparklineCurve
                :data="Array.from(data.val.data.map(obj => obj.stats))"
                :limit="data.val.data.length"
                :styles="data.val.style"
                ref-line-type="max"
              />
            </sparkline>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
import sparkline from 'vue-sparklines'
import { map } from 'lodash'
const moment = require('moment')
export default {
  props: { data: Object },
  components: { sparkline },
  data () {
    return {
      map: map,
      moment: moment
    }
  },
  computed: {
    // total for stats
    summary () {
      return Array.from(this.data.val.data.map(obj => obj.stats)).reduce((x, y) => x + y)
    }
  }
}
</script>

<template>
  <q-card class="q-mt-sm">
    <q-card-section class="text-h6 q-pb-none">
      <q-item>
        <q-item-section avatar class="">
          <q-icon color="blue" :name="settings.icon" size="44px"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <div class="text-h6">{{settings.header}}</div>
          </q-item-label>
          <q-item-label caption class="text-black">
            {{settings.subheader}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <q-table class="no-shadow no-border" :data="settings.data" :columns="settings.columns" hide-bottom>
        <template v-slot:body-cell-Products="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-avatar square>
                  <img :src="props.row.prod_img">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.code }}</q-item-label>
                <q-item-label>{{ props.row.product_name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item>
              <q-item-section avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
                <q-item-label caption class="">Joined date: <br/>{{ props.row.date }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Status="props">
          <q-td :props="props" class="text-left">
            <q-chip class="text-white text-capitalize" :label="props.row.status"
                    :color="getChipColor(props.row.status)"
            ></q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-Stock="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>
                  <span class="text-blue">
                    <q-icon name="bug_report" color="blue" size="20px" v-if="props.row.type=='error'"></q-icon>
                    <q-icon name="settings" color="blue" size="20px" v-if="props.row.type=='info'"></q-icon>
                    <q-icon name="flag" color="blue" size="20px" v-if="props.row.type=='success'"></q-icon>
                    <q-icon name="fireplace" color="blue" size="20px" v-if="props.row.type=='warning'"></q-icon>
                    {{ props.row.stock }}
                  </span>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="positive"
                          v-if="props.row.type=='success'"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="info"
                          v-if="props.row.type=='info'"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="warning"
                          v-if="props.row.type=='warning'"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="negative"
                          v-if="props.row.type=='error'"></q-chip>
                </q-item-label>
                <q-item-label caption class="">
                  <q-linear-progress dark :color="getColor(props.row.Progress)" :value="props.row.Progress/100"
                  />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  components: {
    IEcharts
  },
  name: "list",
  props: ['settings'],
  methods: {
    getColor(val) {
      if (val > 70 && val <= 100) {
          return 'green'
      } else if (val > 50 && val <= 70) {
          return 'blue'
      }
      return 'red'
    },
    getChipColor(status) {
      if (status == 'Vacation') {
          return 'negative'
      } else if (status == 'Online') {
          return 'positive'
      } else if (status == 'Away') {
          return 'warning'
      } else if (status == 'Logged Out') {
          return 'info'
      } else {
          return 'dark'
      }
    }
  }
}
</script>

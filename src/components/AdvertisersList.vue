<template>
  <q-card class="column no-wrap flex-start list-card">
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
    <q-card-section class="q-pa-none q-mt-lg q-ma-none">
      <q-table
        table-style="max-height: 75vh"
        :data="advData"
        :grid="card"
        :columns="columns"
        hide-bottom
        virtual-scroll
        row-key="userNmae"
      >
        <!-- List view -->
        <template
          v-slot:body-cell-media="props"
          v-if="!card"
        >
          <q-td :props="props">
            <q-img
              style="height: 50px"
              contain
              :src="props.row.media"
            />
          </q-td>
        </template>
        <!-- Default | Card view -->
        <template
          v-slot:item="props"
          v-if="card"
        >
          <advertisers-card :props="props" />
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import AdvertisersCard from './AdvertisersCard'
export default {
  name: 'AdvertisersList',
  props: {
    fullData: { type: Object, default: null }
  },
  components: { AdvertisersCard },
  data () {
    return {
      card: true,
      row: null,
      advData: [
        {
          userName: 'Finder.com',
          media: 'https://dvh1deh6tagwk.cloudfront.net/finder-us/wp-uploads/sites/3/2015/09/finder_logo.png',
          items: '3',
          impressions: '3371000434',
          contentItems: '3600',
          engagements: '188123',
          appearences: '228002',
          actions: '43449',
          thisMonth: '13763',
          allTime: '118029'
        },
        {
          userName: 'RandomInc.com',
          media: 'https://cdn.worldvectorlogo.com/logos/random.svg',
          items: '3',
          impressions: '298364',
          contentItems: '2837',
          engagements: '188123',
          appearences: '21232',
          actions: '13449',
          thisMonth: '23763',
          allTime: '318029'
        },
        {
          userName: 'kindpng.com',
          media: 'https://www.kindpng.com/picc/m/700-7007170_logo-transparent-random-logo-png-png-download.png',
          items: '4',
          impressions: '459763',
          contentItems: '51091',
          engagements: '203726',
          appearences: '33091',
          actions: '632844',
          thisMonth: '172129',
          allTime: '138721'
        },
        {
          userName: 'Print.com',
          media: 'https://cdn5.f-cdn.com/contestentries/1462884/32320338/5c2f33d1c5684_thumb900.jpg',
          items: '5',
          impressions: '3372019',
          contentItems: '36938',
          engagements: '188827',
          appearences: '22026',
          actions: '43817',
          thisMonth: '123233',
          allTime: '1220192'
        },
        {
          userName: 'Floop.com',
          media: 'https://www.freelogodesign.org/Content/img/logo-samples/flooop.png',
          items: '1',
          impressions: '33782753423',
          contentItems: '3635',
          engagements: '188029',
          appearences: '22873',
          actions: '43098',
          thisMonth: '113399',
          allTime: '113000'
        }
      ],
      columns: [
        {
          name: 'userName',
          required: true,
          label: 'User Name',
          align: 'left',
          field: row => row.userName,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'media', align: 'center', label: 'Media', field: 'media', sortable: true },
        { name: 'items', label: 'Items', field: 'items', sortable: true },
        { name: 'impressions', label: 'Impressions', field: 'impressions', sortable: true },
        { name: 'contentItems', label: 'Content Items', field: 'contentItems', sortable: true },
        { name: 'engagements', label: 'Engagements', field: 'engagements', sortable: true },
        { name: 'appearences', label: 'Appearences', field: 'appearences', sortable: true },
        { name: 'actions', label: 'Actions', field: 'actions', sortable: true },
        { name: 'thisMonth', label: 'This Month', field: 'thisMonth', sortable: true },
        { name: 'allTime', label: 'All Time', field: 'allTime', sortable: true }
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
</style>

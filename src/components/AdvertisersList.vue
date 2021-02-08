<template>
  <q-card
    flat
    class="column no-wrap flex-start list-card"
  >
    <q-card-section
      style="background-color: rgba(236, 240, 241, 1);"
      class="text-h6 row no-wrap items-baseline"
    >
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
    <q-card-section
      style="border-radius: 8px;"
      class="q-ma-xs"
    >
      <q-table
        table-style="max-height: 75vh;"
        style="border-radius: 8px;"
        class="text-h6"
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
          items: '4',
          impressions: '2477473',
          contentItems: '3600',
          engagements: '15660',
          actions: '0',
          thisMonth: '0',
          allTime: '0'
        },
        {
          userName: 'E3 Sparkplugs',
          media: 'https://e3sparkplugs.com/media/site/images/logo-e3.png',
          items: '5',
          impressions: '1156706',
          contentItems: '3600',
          engagements: '378',
          actions: '0',
          thisMonth: '0',
          allTime: '0'
        },
        {
          userName: 'Fixd.com',
          media: 'https://assets-global.website-files.com/5f76314c5145773d1027bdad/5f76314cde4c68dc7bcac5c4_FIXD_Logo_FullColor.png',
          items: '4',
          impressions: '357677',
          contentItems: '3600',
          engagements: '11',
          actions: '0',
          thisMonth: '0',
          allTime: '0'
        }
      ],
      columns: [
        {
          name: 'userName',
          required: true,
          label: 'Account Name',
          align: 'left',
          field: row => row.userName,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'media', align: 'center', label: 'Media', field: 'media', sortable: true },
        { name: 'items', label: 'Items', field: 'items', sortable: true },
        { name: 'impressions', label: 'Impressions', field: 'impressions', sortable: true },
        { name: 'contentItems', label: 'Content Video Plays', field: 'contentItems', sortable: true },
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

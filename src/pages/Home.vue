<template>
  <q-page
    class="q-pa-md"
    style="background-color: rgba(236, 240, 241, 1);"
  >
    <q-card
      class="q-mx-md q-mt-lg"
      style="border-radius: 8px;"
    >
      <q-card-section
        class="row justify-end q-pa-none q-ma-none"
        style="height: 130px;"
      >
        <div>
          <div class="row q-mx-lg">
            <h4 class="">
              Welcome
            </h4>
          </div>
          <div class="row" />
        </div>
        <q-space />
        <div />
      </q-card-section>
      <q-card-section class="">
        <div class="row" />
        <div class="row" />
      </q-card-section>
    </q-card>

    <!-- <stats :settings="user.settings.admin.content.stats" /> -->
    <!-- <breakdown :settings="content" /> -->
    <!-- <list :settings="content" /> -->
  </q-page>
</template>

<script>
// import Stats from 'components/Stats.vue'
// import Breakdown from 'components/Breakdown.vue'
// import List from 'src/components/List.vue'

export default {
  name: 'PageHome',
  components: {
    // Stats,
    // Breakdown,
    // List
  },
  data () {
    return {
      settings: this.$store.state.app.settings,
      user: this.$store.state.user,
      content: {
        icon: 'fas fa-chart-line',
        header: 'Top Performers',
        subheader: 'These are the top performing campaigns across all your content',
        columns: [
          {
            name: 'Products',
            label: 'Campaigns',
            field: 'Products',
            sortable: true,
            align: 'left'
          },
          {
            name: 'Name',
            label: 'Member',
            field: 'name',
            sortable: true,
            align: 'left'
          },
          {
            name: 'Total',
            label: 'Total',
            field: 'total',
            sortable: true,
            align: 'right',
            classes: 'text-bold'
          },
          {
            name: 'Status',
            label: 'Status',
            field: 'status',
            sortable: true,
            align: 'left',
            classes: 'text-bold'
          },
          {
            name: 'Stock',
            label: 'Tasks',
            field: 'task',
            sortable: true,
            align: 'left'
          }
        ],
        data: [
          {
            name: 'Super Volunteer',
            Progress: 70,
            status: 'Vacation',
            stock: '14 / 30',
            date: '23 Oct 2018',
            avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
            product_name: 'Truth in Broadcasting',
            total: '303,344',
            code: 'KDH8WK',
            prod_img: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4'
          },
          {
            name: 'Mayank Patel',
            Progress: 60,
            status: 'Online',
            date: '11 Nov 2018',
            stock: '25 / 70',
            avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
            product_name: 'End Corruption in NJ District 45',
            total: '23,100',
            code: 'AA43OX',
            prod_img: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4'
          },
          {
            name: 'Mayur Patel',
            Progress: 30,
            status: 'Away',
            stock: '35 / 50',
            avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
            product_name: 'Kony 2021',
            total: '340',
            date: '19 Sept 2020',
            code: 'J2K9QQ',
            prod_img: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4'
          },
          {
            name: 'Jeff Galbraith',
            Progress: 100,
            status: 'Logged Out',
            stock: '18 / 33',
            avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
            product_name: 'Federal Child Protection Changes',
            total: '224',
            date: '19 Sept 2020',
            code: 'JKL345',
            prod_img: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4'
          }
        ]
      }
    }
  }
}
</script>

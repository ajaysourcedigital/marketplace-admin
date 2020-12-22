<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      round
      v-for="(icon, index) in social"
      :key="index"
    >
      <q-avatar size="42px">
        <img :src="icon.src">
      </q-avatar>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Connections',
  props: [],
  data () {
    return {
      social: [
        {
          src: require('../assets/social_icons/facebook.png')
        },
        {
          src: require('../assets/social_icons/twitter.png')
        },
        {
          src: require('../assets/social_icons/instagram.png')
        },
        {
          src: require('../assets/social_icons/twitch.png')
        },
        {
          src: require('../assets/social_icons/youtube.png')
        },
        {
          src: require('../assets/social_icons/discord.png')
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

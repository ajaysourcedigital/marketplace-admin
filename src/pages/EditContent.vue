<template>
  <q-page padding>
    Editing content {{ id }}
    <inner-loading :showing="content === null" />
  </q-page>
</template>

<script>
import InnerLoading from 'components/InnerLoading'

export default {
  name: 'PageEditContent',
  components: {
    InnerLoading
  },
  props: {
    id: [String, Number]
  },
  data () {
    return {
      content: null
    }
  },
  async created () {
    try {
      const { data } = await this.$api(`/distributions/${this.id}`)
      this.content = data
    } catch (e) {
      console.error('Error occurred while fetching data.', e)
    }
  }
}
</script>

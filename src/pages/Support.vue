<template>
  <div class="q-pa-md q-px-xl">
    <messages-header /> TEST
    <div class="row q-mt-md">
      <div
        class="q-pa-sm"
        style="width:300px"
      >
        <messages-search @doSearch="search4user" />
        <messages-user-list
          :messages="subUserList"
          @selectUser="openMsgThread"
        />
      </div>
      <div
        class="q-pa-sm"
        style="max-width:700px"
      >
        <messages-conversation :sel-user="selectedUser" />
      </div>
    </div>
  </div>
</template>

<!-- Start of sourcedigital Zendesk Widget script -->
<script
  id="ze-snippet"
  src="https://static.zdassets.com/ekr/snippet.js?key=9917360e-6929-4970-94cf-20c54cf31289"
></script>
<!-- End of sourcedigital Zendesk Widget script -->

<script>
import MessagesHeader from '../components/messages/Header'
import MessagesSearch from '../components/messages/Search'
import MessagesUserList from '../components/messages/UserList'
import MessagesConversation from '../components/messages/Conversation'

// We're using sample data here. TODO: Model will provide the data from the DB
import * as myData from '../model/messages.js'

import TimeSince from '../mixins/TimeSince'

export default {
  name: 'Messages',
  components: {
    MessagesHeader,
    MessagesSearch,
    MessagesUserList,
    MessagesConversation
  },
  mixins: [TimeSince],
  data () {
    return {
      userList: myData.sampleData.messages,
      subUserList: this.formatData(myData.sampleData.messages),
      selectedUser: myData.sampleData.messages[0]
    }
  },

  methods: {
    formatData: function (users) {
      for (const item of users) {
        const dateObj = new Date(item.lastMsgDate)
        item.time = this.getTimeShort(dateObj)
      }
      return users
    },

    search4user: function (userName) {
      // TODO: Controller to search DB for user to message, with userName like " + userName
      this.selectedUser = ''
      if (userName.trim().length === 0) {
        this.subUserList = this.formatData(this.userList)
      } else {
        const subList = []
        for (const item of this.userList) {
          const dataName = item.name.toLowerCase()
          const searchName = userName.toLowerCase()
          if (dataName.indexOf(searchName) >= 0) {
            this.subList.push(item)
          }
        }
        this.subUserList = this.formatData(subList)
      }
    },

    openMsgThread: function (userId) {
      // TODO: Controller to read from DB and get the message thread for userId = " + userId
      for (const item of this.userList) {
        if (item.id === userId) {
          this.selectedUser = item
        }
      }
    }
  }
}
</script>

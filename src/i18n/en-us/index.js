// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  dashboard: {
    topMetacontent: {
      title: 'Top Metacontent',
      subTitle: 'A breakdown of the top performing meta-content across all of your content.'
    }
  },
  login: {
    errors: {
      400: 'Please Check your credentials',
      429: 'You are trying to login too often. Please wait a moment before trying again.',
      default: 'Login error'
    }
  },
  search: {
    bar: {
      text: 'Find...'
    }
  },
  // Invite is actually being used in the invite components so don't delete!
  // Keys are named the same as their respective components in src/invite
  invite: {
    header: 'Invite Users',
    listItemAction: {
      inviteUsers: 'Invite Users',
      cancelAction: 'Cancel'
    },
    listItem: {
      userToInvite: 'Username or email address',
      role: 'Role'
    },
    splash: {
      header: 'Congratulations!',
      subHeader: 'Users invited successfully.',
      homeBtn: 'Home'
    }
  }
}

<template>
  <div class="row q-col-gutter-md q-py-md q-px-xl">
    <div class="">
      <q-btn
        @click="$router.go(-1)"
        elevated
        rounded
        color="primary"
        :label="$t('invite.listItemAction.cancelAction')"
      />
    </div>
    <div class="">
      <q-btn
        @click="handleAdd()"
        elevated
        rounded
        color="info"
        :label="$t('invite.listItemAction.inviteUsers')"
      />
    </div>
  </div>
</template>

<script>
/*

    Version 0.1

    Invite List Item Action component.

    Receives a list of invitations from parent and processes them.
    Once invitations have been processed, report to parent success or failure of processing.

*/
export default {
  name: 'InviteListItemAction',
  props: {
    list: Array
  },
  methods: {
    // Invite Users button action
    handleAdd () {
      /*

          TODO :
        1. Verify the inputs are correct.
        2. Handle invites in 'list' via strapi.

        invite schema: id, campaign, userId, rights, group, role, dateCreated, dateModified, modifiedBy

      */

      // Report to parent invites were successfully sent
      this.$emit('inviteSuccess', true)

      // If something went wrong in sending invitations, use this.$emit('inviteSuccess', false);
    }
  }
}
</script>

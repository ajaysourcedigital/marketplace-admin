<template>
    <div class="text-center q-py-xl">
        <div class="text-h4">
            {{ $t('invite.splash.header') }}
        </div>
        <div class="">
            {{ $t('invite.splash.subHeader') }}
        </div>
        <div class="q-py-md">
            <q-btn 
                style="width:200px;"
                to="/"
                :label="$t('invite.splash.homeBtn')"
            />
        </div>
    </div>
</template>

<script>
/*

    Version 1.0

    Invitation Splash page component.

*/
export default {
  name: "InviteSplash",
  props: []
}
</script>
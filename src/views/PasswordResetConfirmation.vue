<template>
  <ilha-new-password-confirmation
    :app-logo="appLogo"
    :loading="passwordResetLoading"
    @onPasswordReset="resetPassword($event)"/>
</template>

<script>
import { toastsMixin, usersMixin } from 'admin-buddy';
import appLogo from '../assets/imgs/unicef-eu-asia-logo.png';

export default {
  mixins: [
    toastsMixin,
    usersMixin,
  ],
  data() {
    return {
      appLogo,
    };
  },
};
</script>

<style>
.ilha-new-password-confirmation {
  background-color: #CCCCCC;
}
</style>

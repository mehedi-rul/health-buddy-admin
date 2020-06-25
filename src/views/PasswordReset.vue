<template>
  <ilha-password-reset
    :app-logo="appLogo"
    :loading="passwordResetLoading"
    @onPasswordReset="requestPasswordReset($event)"/>
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
.ilha-password-reset {
  background-color: #CCCCCC;
}
</style>

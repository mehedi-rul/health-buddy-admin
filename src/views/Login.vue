<template>
  <ilha-login
    :app-logo="appLogo"
    :loading="loginLoading"
    @onLogin="tryLogin($event)"/>
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

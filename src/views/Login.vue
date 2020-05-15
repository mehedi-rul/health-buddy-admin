<template>
  <ilha-login :app-logo="appLogo" :user-service="userService"/>
</template>

<script>
import appLogo from '../assets/imgs/unicef-eu-asia-logo.png';
import userService from '../services/users';

export default {
  data() {
    return {
      appLogo,
      userService,
    };
  },
};
</script>

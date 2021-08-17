<template>
  <div class="login__body_info">
    <ilha-login
      :app-logo="appLogo"
      :loading="loginLoading"
      @onLogin="tryLogin($event)"/>
  </div>
</template>

<script>
import { toastsMixin, usersMixin } from 'admin-buddy';
import appLogo from '../assets/imgs/health-buddy-logo.png';

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
.notification.is-info {
    background-color: #E4F5FE !important;
}
.login__body_info{
  display: contents;
}
.login__body_info .button.is-info {
    background-color: #1936BF !important;
}
.ilha-login__logo-container img, .ilha-password-reset__logo-container img, .ilha-new-password-confirmation__logo-container img {
    height: auto;
    zoom: .18;
}
.ilha-login__form .subtitle{
    zoom: .9;
}
</style>

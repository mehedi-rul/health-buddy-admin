<template>
  <ilha-password-reset
    :loading="passwordResetLoading"
    @onPasswordReset="requestPasswordReset($event)"/>
</template>

<script>
import { toastsMixin, usersMixin } from 'admin-buddy';

export default {
  mixins: [
    toastsMixin,
    usersMixin,
  ],
  data() {
    return {
    };
  },
};
</script>

<style>
.ilha-password-reset {
  background-color: #CCCCCC;
}
</style>

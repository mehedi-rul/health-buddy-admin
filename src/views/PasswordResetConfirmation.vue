<template>
  <ilha-new-password-confirmation
    :loading="passwordResetLoading"
    @onPasswordReset="resetPassword($event)"/>
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
.ilha-new-password-confirmation {
  background-color: #CCCCCC;
}
</style>

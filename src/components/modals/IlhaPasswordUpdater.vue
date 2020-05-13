<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Change password</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Old password"
                 :type="{ 'is-danger': !password, 'is-success': password}">
          <b-input
            type="password"
            v-model="password"
            placeholder="Old password"
            password-reveal
            required>
          </b-input>
        </b-field>

        <b-field label="New password"
                 :type="{ 'is-danger': !newPassword, 'is-success': newPassword}">
          <b-input
            type="password"
            v-model="newPassword"
            password-reveal
            placeholder="New password"
            required>
          </b-input>
        </b-field>

        <b-field label="Confirm new password"
                 :type="{ 'is-danger': !confirmationPassword || newPassword != confirmationPassword,
                 'is-success': confirmationPassword && newPassword == confirmationPassword}"
                 :message="newPassword != confirmationPassword
                 ? 'This field confirmation does not match' : undefined">
          <b-input
            type="password"
            v-model="confirmationPassword"
            password-reveal
            placeholder="Confirm new password"
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Cancel</button>
        <b-button
          type="is-info"
          :disabled="!canSave"
          @click="changePassword">Save
        </b-button>
      </footer>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      password: undefined,
      newPassword: undefined,
      confirmationPassword: undefined,
    };
  },
  computed: {
    canSave() {
      return this.password && this.newPassword && this.confirmationPassword
        && this.newPassword === this.confirmationPassword;
    },
  },
  methods: {
    changePassword() {
      this.$emit('onPasswordChangeRequest', {
        password: this.password,
        newPassword: this.newPassword,
      });
      setTimeout(() => {
        this.$parent.close();
      }, 0);
    },
  },
};
</script>

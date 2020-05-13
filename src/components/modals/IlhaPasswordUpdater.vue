<template>
  <section>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Change password</p>
      </header>
      <ilha-form
        :fields="fields"
        :has-spacing="false"
        :inputs-container-classes="['modal-card-body']"
        :actions-classes="['modal-card-foot']">
        <template v-slot:button>
          <b-button type="button" @click="$parent.close()">Cancel</b-button>
        </template>
      </ilha-form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      password: undefined,
      newPassword: undefined,
      confirmationPassword: undefined,
      fields: [
        {
          property: 'oldPassword',
          type: 'password',
          label: 'Old Password',
          placeholder: 'Old Password',
          rules: 'required',
        },
        {
          property: 'newPassword',
          type: 'password',
          label: 'New Password',
          placeholder: 'New Password',
          rules: 'required',
        },
        {
          property: 'confirmationPassword',
          type: 'password',
          label: 'Confirm New Password',
          placeholder: 'Confirm New Password',
          rules: 'required|confirmed:newPassword',
        },
      ],
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

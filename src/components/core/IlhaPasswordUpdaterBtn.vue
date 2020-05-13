<template>
  <span class="ilha-password-updater-btn">
    <b-button
      type="is-info"
      class="m-t-1"
      @click="isComponentModalActive = true"
      outlined>Change password</b-button>
      <b-modal :active.sync="isComponentModalActive"
               has-modal-card
               trap-focus
               :destroy-on-hide="false"
               aria-role="dialog"
               aria-modal>
              <ilha-password-updater
                @onPasswordChangeRequest="changePassword">
              </ilha-password-updater>
          </b-modal>
  </span>
</template>

<script>

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isComponentModalActive: false,
      formProps: {
      },
    };
  },
  methods: {
    changePassword($event) {
      this.$emit('onPasswordChangeRequest', $event);
    },
  },
};
</script>

<template>
  <section class="ilha-user">
    <ilha-header>
      <template v-slot:title>
        Users / Edit
      </template>
    </ilha-header>
    <ilha-form
      :url="adminUrl"
      :id="id"
      :fields="fields">
      <template v-slot:button>
        <ilha-password-updater-btn
          :url="'s'"></ilha-password-updater-btn>
      </template>
    </ilha-form>
  </section>
</template>

<script>
import usersService from '../services/users';

export default {
  data() {
    return {
      adminUrl: usersService.getUsersUrl(),
      id: undefined,
      fields: [
        {
          property: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Username',
          maxlength: 30,
          rules: 'required',
        },
        {
          property: 'first_name',
          type: 'text',
          label: 'First name',
          placeholder: 'First name',
          maxlength: 30,
          rules: 'required',
        },
        {
          property: 'last_name',
          type: 'text',
          label: 'Last name',
          placeholder: 'Last name',
          maxlength: 30,
          rules: 'required',
        },
        {
          property: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Email',
          maxlength: 30,
          rules: 'required|email',
        },
      ],
    };
  },
  methods: {
    changePassword() {
    },
    updateId() {
      this.id = this.$route.params.id;
    },
  },
  mounted() {
    this.updateId();
  },
};

</script>

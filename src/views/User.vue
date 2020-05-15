<template>
  <section class="ilha-user">
    <ilha-header>
      <template v-slot:title>
        Users / Edit
      </template>
    </ilha-header>
    <ilha-form
      :resource-url="userUrl"
      :edit-url="userUrl"
      :id="id"
      :fields="fields"
      @onSaveSuccess="saveSuccess"
    >
      <template v-slot:button>
        <ilha-password-updater-btn
          v-if="id"
          :url="'s'"></ilha-password-updater-btn>
      </template>
    </ilha-form>
  </section>
</template>

<script>
import usersService from '../services/users';

const fields = [
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
];

const passwordFields = [
  {
    property: 'password',
    type: 'password',
    label: 'New Password',
    placeholder: 'New Password',
    rules: 'required|min:8',
  },
  {
    property: 'confirmationPassword',
    type: 'password',
    label: 'Confirm New Password',
    placeholder: 'Confirm New Password',
    rules: 'required|min:8|confirmed:password',
  },
];

export default {
  data() {
    return {
      userUrl: usersService.getUsersUrl(),
      editUserUrl: '/admin/users',
      id: undefined,
      fields: [...fields],
    };
  },
  methods: {
    changePassword() {
    },
    updateId() {
      const id = +this.$route.params.id;
      if (!Number.isNaN(id)) {
        this.id = id;
        this.fields = [...fields];
      } else {
        this.fields = [...fields, ...passwordFields];
      }
    },
    saveSuccess(data) {
      this.$router.replace({ params: { id: data.id } });
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.id'() {
      this.updateId();
    },
  },
  mounted() {
    this.updateId();
  },
};

</script>

<template>
  <section class="ilha-user">
    <ilha-header
      :query="query"
      @search="search">
      <template v-slot:title>
        Users / Edit
      </template>
    </ilha-header>
    <ilha-form
      :data="data"
      :loading="loading"
      :fields="fields"
      @onSaveRequest="save"
    >
<!--      <template v-slot:button>-->
<!--        <ilha-password-updater-btn-->
<!--          v-if="id"-->
<!--          :url="changePasswordUrl"></ilha-password-updater-btn>-->
<!--      </template>-->
    </ilha-form>
  </section>
</template>

<script>
import usersService from '../services/users';
import searchMixin from '../mixins/search';
import formMixin from '../mixins/form';

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
    label: 'Password',
    placeholder: 'New Password',
    rules: 'required|min:8',
  },
  {
    property: 'confirmationPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    rules: 'required|min:8|confirmed:password',
  },
];

export default {
  mixins: [searchMixin, formMixin],
  data() {
    return {
      resourceUrl: usersService.getUsersUrl(),
      changePasswordUrl: `${usersService.getUsersUrl()}/change_password`,
      searchRouteName: 'UsersAdmin',
      fields: [...fields],
    };
  },
  methods: {
    changePassword() {
    },
    updatedId() {
      if (this.id) {
        this.fields = [...fields];
      } else {
        this.fields = [...fields, ...passwordFields];
      }
    },
  },
};

</script>

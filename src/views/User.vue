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
    <template v-slot:button>
      <div class="user_active_button_hb">
        <div>
          <b-checkbox v-model="isActive" class="is-pulled-left m-t-1" v-if="data.is_active == false">
            Active
          </b-checkbox>
        </div>
        <div>
          <b-checkbox v-model="isAdmin" class="is-pulled-left m-t-1">
            Admin
          </b-checkbox>
        </div>
      </div>
    </template>
    </ilha-form>
  </section>
</template>

<script>
import {
  searchMixin,
  formMixin,
  toastsMixin,
  usersMixin,
} from 'admin-buddy';
import axios from 'axios';

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
    label: 'Name',
    placeholder: 'Name',
    maxlength: 30,
    rules: 'required',
  },
  {
    property: 'last_name',
    type: 'text',
    label: 'Agency',
    placeholder: 'Add Agency name',
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
  {
    property: 'email',
    type: 'email',
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
    autocomplete: 'new-password',
  },
  {
    property: 'confirmationPassword',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    rules: 'required|min:8|confirmed:password',
    autocomplete: 'off',
  },
];

export default {
  mixins: [searchMixin, formMixin, toastsMixin, usersMixin],
  data() {
    return {
      searchRouteName: 'UsersAdmin',
      fields: [...fields],
    };
  },
  methods: {
    changePassword() {
    },
    updatedData() {
      if (this.data.id) {
        this.fields = [...fields];
      } else {
        this.fields = [...fields, ...passwordFields];
      }
    },
  },
  computed: {
    changePasswordUrl() {
      return `${this.usersUrl}/change_password`;
    },
    isAdmin: {
      get() {
        return this.data.is_staff;
      },
      set(newRole) {
        axios.put(`${this.usersUrl}/${this.data.id}/change_permission`);
        return newRole;
      },
    },
    isActive: {
      get() {
        console.log(this.data.is_active);
        return this.data.is_active;
      },
      set(newRole) {
        axios.patch(`${this.usersUrl}/${this.data.id}/active_user`);
        return newRole;
      },
    },
  },
  watch: {
    usersUrl() {
      this.resourceUrl = this.usersUrl;
    },
    data() {
      this.updatedData();
    },
  },
  mounted() {
    this.data = {};
    this.resourceUrl = this.usersUrl;
  },
};
</script>

<style scoped>
.user_active_button_hb{
  display: grid;
}
</style>

<template>
  <section class="users">
    <ilha-header>
      <template v-slot:title>
        Users
      </template>
    </ilha-header>
    <ilha-table
      :admin-url="userUrl"
      :edit-url="editUserUrl"
      :header="header"
      can-edit
      can-delete
    ></ilha-table>
  </section>
</template>

<script>
import usersService from '../services/users';

export default {
  data() {
    return {
      userUrl: usersService.getUsersUrl(),
      editUserUrl: '/admin/users/',
      header: [
        {
          property: 'first_name',
          label: 'First name',
          sortable: true,
        },
        {
          property: 'last_name',
          label: 'Last name',
          sortable: true,
        },
        {
          property: 'email',
          label: 'Email',
          sortable: true,
        },
      ],
    };
  },
};

</script>

<style lang="scss" scoped="true">
</style>

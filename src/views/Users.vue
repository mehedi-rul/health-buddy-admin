<template>
  <section class="users">
    <ilha-header
      :new-entity-url="newUserUrl"
      add-btn-label="New user">
      <template v-slot:title>
        Users
      </template>
    </ilha-header>
    <ilha-table
      :resource-url="userUrl"
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
      newUserUrl: '/admin/users/novo',
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

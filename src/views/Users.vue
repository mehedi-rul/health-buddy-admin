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
      :edit-url="editUrl"
      :header="header"
      :loading="loading"
      :data="data"
      :current-page="currentPage"
      :total-rows="totalRows"
      :sort-field="sortField"
      :sort-order="sortOrder"
      :default-sorter-order="defaultSortOrder"
      @onPageChange="changePage"
      @onSort="sort"
      @onDelete="requestDelete"
      can-edit
      can-delete
    ></ilha-table>
  </section>
</template>

<script>
import usersService from '../services/users';
import tableMixin from '../mixins/table';

export default {
  mixins: [tableMixin],
  data() {
    return {
      resourceUrl: usersService.getUsersUrl(),
      editUrl: '/admin/users/',
      newUserUrl: '/admin/users/novo',
      header: [
        {
          property: 'id',
          label: '#',
          sortable: true,
        },
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

<template>
  <section class="users">
    <ilha-header
      :creation-route="newUserRoute"
      :query="query"
      @search="search">
      <template v-slot:title>
        Users
      </template>
      <template v-slot:creationBtnLabel>
        New user
      </template>
    </ilha-header>
    <ilha-table
      :edit-route-name="editRouteName"
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
import {
  searchMixin,
  tableMixin,
  toastsMixin,
  usersMixin,
} from 'admin-buddy';

export default {
  mixins: [toastsMixin, searchMixin, tableMixin, usersMixin],
  data() {
    return {
      editRouteName: 'UserEdit',
      searchRouteName: 'UsersAdmin',
      newUserRoute: { name: 'UserEdit', params: { id: 'new' } },
      header: [
        {
          property: 'id',
          label: '#',
          sortable: true,
        },
        {
          property: 'is_active',
          label: 'Active',
        },
        {
          property: 'username',
          label: 'Username',
          sortable: true,
        },
        {
          property: 'first_name',
          label: 'First name',
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
  watch: {
    usersUrl() {
      this.resourceUrl = this.usersUrl;
    },
  },
  mounted() {
    this.resourceUrl = this.usersUrl;
  },
};

</script>

<style lang="scss" scoped="true">
</style>

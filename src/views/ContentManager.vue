<template>
  <section class="users">
    <ilha-header
      :creation-route="newAdminUnitRoute"
      :query="query"
      @search="search">
      <template v-slot:title>
        Content Manager
      </template>
      <template v-slot:creationBtnLabel>
        New article
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
      idField="slug"
      can-edit
      can-delete
    ></ilha-table>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  searchMixin,
  tableMixin,
  toastsMixin,
  usersMixin,
} from 'admin-buddy';

export default {
  mixins: [
    toastsMixin,
    searchMixin,
    tableMixin,
    usersMixin,
  ],
  computed: {
    ...mapGetters(['articlesUrl']),
  },
  data() {
    return {
      editRouteName: 'ArticleEdit',
      searchRouteName: 'ContentManagerAdmin',
      newAdminUnitRoute: { name: 'ArticleEdit', params: { id: 'novo' } },
      header: [
        {
          property: 'id',
          label: '#',
          sortable: true,
        },
        {
          property: 'title',
          label: 'Title',
          sortable: true,
        },
        {
          property: 'subtitle',
          label: 'Subtitle',
          sortable: true,
        },
      ],
    };
  },
  mounted() {
    this.resourceUrl = this.articlesUrl;
  },
};

</script>

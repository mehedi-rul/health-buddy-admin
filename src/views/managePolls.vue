<template>
  <section class="users">
    <ilha-header
      :creation-route="newUserRoute"
      :query="query"
      @search="search">
      <template v-slot:title>
        Polls
      </template>
      <template v-slot:creationBtnLabel>
        New Poll
      </template>
    </ilha-header>
    <managetable
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
    ></managetable>
  </section>
</template>

<script>
import {
  searchMixin,
  tableMixin,
  toastsMixin,
  usersMixin,
} from 'admin-buddy';
import { mapGetters } from 'vuex';
import ManageTable from './manage-table.vue';

export default {
  mixins: [toastsMixin, searchMixin, tableMixin, usersMixin],
  computed: {
    ...mapGetters(['pollsUrl']),
  },
  components: {
    managetable: ManageTable,
  },
  data() {
    return {
      editRouteName: 'ManageEdit',
      searchRouteName: 'ManageAdmin',
      newUserRoute: { name: 'ManageEdit', params: { id: 'new' } },
      data_a: 'acive',
      header: [
        {
          property: 'id',
          label: 'SI',
          sortable: true,
          classWidth: 'active__status',
        },
        {
          property: 'name',
          label: 'Poll Name',
          sortable: true,
          classWidth: 'active__status',
        },
        {
          property: 'link',
          label: 'Poll Link',
          sortable: true,
          classWidth: 'unActive_status',
        },
        {
          property: 'author',
          label: 'Added by',
          sortable: true,
          classWidth: 'active__status',
        },
        {
          property: 'is_active',
          label: 'Status',
          sortable: true,
          classWidth: 'active__status active__checkbox',
        },
      ],
    };
  },
  watch: {
    usersUrl() {
      this.resourceUrl = this.pollsUrl;
    },
  },
  mounted() {
    this.resourceUrl = this.pollsUrl;
    this.formatData = (data) => data.map((poll) => ({ ...poll, id: poll.id }));
  },
};

</script>

<style lang="scss" scoped="true">

</style>

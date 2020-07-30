<template>
  <section class="users">
    <ilha-header
      :creation-route="newUserRoute"
      :query="query"
      @search="search">
      <template v-slot:title>
        Flows
      </template>
      <template v-slot:creationBtnLabel>
        New flow
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
import { mapGetters } from 'vuex';
import {
  searchMixin,
  tableMixin,
  toastsMixin,
} from 'admin-buddy';

export default {
  mixins: [toastsMixin, searchMixin, tableMixin],
  computed: {
    ...mapGetters(['flowsUrl']),
  },
  methods: {
  },
  data() {
    return {
      editRouteName: 'FlowEdit',
      searchRouteName: 'FlowsAdmin',
      newUserRoute: { name: 'FlowEdit', params: { id: 'new' } },
      header: [
        {
          property: 'uuid',
          label: 'UUID',
          sortable: true,
        },
        {
          property: 'name',
          label: 'Name',
          sortable: true,
        },
      ],
    };
  },
  watch: {
    flowsUrl() {
      this.resourceUrl = this.flowsUrl;
    },
  },
  mounted() {
    this.resourceUrl = this.flowsUrl;
    this.formatData = (data) => data.map((flow) => ({ ...flow, id: flow.uuid }));
  },
};

</script>

<style lang="scss" scoped="true">
</style>

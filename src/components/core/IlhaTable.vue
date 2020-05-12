<template>
  <section class="ilha-content-list m-3 m-t-1 p-2">
    <b-table
      :data="innerData"
      :loading="loading"

      :striped="true"
      :narrowed="false"
      :hoverable="true"
      :focusable="false"
      :mobile-cards="true"

      paginated
      backend-pagination
      :per-page="perPage"
      :total="totalLines"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"

      backend-sorting
      :default-sort-direction="defaultSortOrder"
      :default-sort="[sortField, sortOrder]"
      @sort="onSort"

      class="table-container">

      <template slot-scope="props">

        <b-table-column
          v-for="(field, index) in header"
          :key="index"
          :field="field.property"
          :label="field.label"
          :sortable="field.sortable"
          :centered="field.centered">
          {{ props.row[field.property] }}
        </b-table-column>

        <b-table-column v-if="hasActions" label="" centered>
          <span class="ilha-content-list__actions">
            <router-link :to="adminUrl + props.row.id">
              <ilha-icon v-if="canEdit" type="edit" class="icon is-medium"/>
            </router-link>
            <ilha-icon
              v-if="canDelete"
              @click.native="confirmDelete(props.row)"
              type="trash"
              class="icon is-medium"/>
          </span>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="emoticon-sad"
                size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>

export default {
  props: {
    adminUrl: {
      type: String,
      default: '',
    },
    header: {
      type: Array,
      default: () => [],
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
    },
    perPage: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      innerData: [],

      loading: false,

      totalLines: 0,
      currentPage: 1,

      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
    };
  },
  computed: {
    isAsyncTable() {
      return !this.data && this.url;
    },
    hasActions() {
      return this.canEdit || this.canDelete;
    },
  },
  methods: {
    initTable() {
      this.currentPage = 0;
      this.totalLines = 0;
      if (this.isAsyncTable) {
        this.loadAsyncData();
      } else {
        this.innerData = [...this.data];
        this.totalLines = this.innerData.length;
      }
    },
    onPageChange(page) {
      this.currentPage = page;
      if (this.isAsyncTable) {
        this.loadAsyncData();
      }
    },
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      if (this.isAsyncTable) {
        this.loadAsyncData();
      } else {
        // TODO sort if table is not async.
      }
    },
    loadAsyncData() {
      if (!this.isAsyncTable) {
        return;
      }
      const params = [
        `sort_by=${this.sortField}.${this.sortOrder}`,
        `page=${this.currentPage}`,
        `page_size:${this.perPage}`,
      ].join('&');

      this.loading = true;
      this.$http.get(`${this.url}?${params}`)
        .then(({ data }) => {
          this.innerData = [...data.results];
          this.totalLines = data.totalResults;
          this.loading = false;
        })
        .catch((error) => {
          this.data = [];
          this.totalLines = 0;
          this.loading = false;
          throw error;
        });
    },
    confirmDelete(data) {
      this.$buefy.dialog.confirm({
        title: 'Deleting account',
        message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          // this.$buefy.toast.open('Account deleted!');
          this.$router.push(`${this.adminUrl}${data.id}/delete`);
        },
      });
    },
  },
  watch: {
    data() {
      this.initTable();
    },
    url() {
      this.initTable();
    },
  },
  mounted() {
    this.initTable();
  },
};
</script>

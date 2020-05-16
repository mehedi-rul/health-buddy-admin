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
      :current-page="currentPage"
      :total="totalRows"
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

      <template v-slot="props">

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
            <router-link :to="editUrl + props.row.id">
              <ilha-icon v-if="canEdit" type="edit" class="icon is-medium"/>
            </router-link>
            <ilha-icon
              v-if="canDelete"
              @click.native="requestDelete(props.row)"
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
    editUrl: {
      type: String,
      default: '',
    },
    header: {
      type: Array,
      default: () => [],
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
    canDelete: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    totalRows: {
      type: Number,
      default: 0,
    },
    sortField: {
      type: String,
      default: 'id',
    },
    sortOrder: {
      type: String,
      default: 'desc',
    },
    defaultSortOrder: {
      type: String,
      default: 'desc',
    },
  },
  data() {
    return {
      innerData: [],
    };
  },
  computed: {
    hasActions() {
      return this.canEdit || this.canDelete;
    },
  },
  methods: {
    initTable() {
      this.innerData = this.data;
    },
    onPageChange(page) {
      this.$emit('onPageChange', page);
    },
    onSort(field, order) {
      this.$emit('onSort', { field, order });
    },
    requestDelete(data) {
      this.$emit('onDelete', data);
    },
  },
  watch: {
    data() {
      this.initTable();
    },
  },
  mounted() {
    this.initTable();
  },
};
</script>

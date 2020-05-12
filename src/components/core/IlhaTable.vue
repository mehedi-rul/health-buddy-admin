<template>
  <section class="ilha-content-list m-3 m-t-1 p-2">
    <b-table
      :data="data"
      :loading="loading"

      :striped="true"
      :narrowed="false"
      :hoverable="true"
      :focusable="false"
      :mobile-cards="true"

      paginated
      backend-pagination
      :per-page="perPage"
      :total="total"
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

        <b-table-column field="name" label="Name" sortable>
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="email" label="Email" sortable>
          {{ props.row.email }}
        </b-table-column>

        <b-table-column field="contact" label="Contact" centered sortable>
          {{ props.row.contact }}
        </b-table-column>

        <b-table-column label="" centered>
          <span class="content-list__actions">
            <ilha-icon type="edit" class="icon is-medium"/>
            <ilha-icon type="trash" class="icon is-medium"/>
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
  data() {
    const data = [];

    for (let i = 0; i < 10; i += 1) {
      data.push(
        {
          id: i + 1,
          name: 'John Doe',
          email: 'john.doe@email.com',
          contact: '+55.82.99999.1234',
          gender: 'Male',
        },
      );
    }

    return {
      data,

      loading: false,

      total: 100,
      page: 1,
      perPage: 10,

      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
    };
  },
  methods: {
    onPageChange(page) {
      this.page = page;
      this.loadAsyncData();
    },
    onSort(field, order) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData();
    },
    loadAsyncData() {
      const params = [
        `sort_by=${this.sortField}.${this.sortOrder}`,
        `page=${this.page}`,
        `pageSize:${this.perPage}`,
      ].join('&');

      console.log(params);
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
  },
};
</script>

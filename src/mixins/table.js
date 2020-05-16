
export default {
  data() {
    return {
      resourceUrl: undefined,
      editUrl: undefined,
      data: [],
      currentPage: 1,
      totalRows: 0,
      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      loading: true,
    };
  },
  methods: {
    initTable() {
      this.currentPage = 1;
      this.totalRows = 0;
      this.loadAsyncData();
    },
    changePage(page) {
      this.currentPage = page;
      this.loadAsyncData();
    },
    sort({ field, order }) {
      this.sortField = field;
      this.sortOrder = order;
      this.loadAsyncData();
    },
    loadAsyncData() {
      const params = [
        `page=${this.currentPage}`,
      ].join('&');

      this.loading = true;
      this.$http.get(`${this.resourceUrl}?${params}`)
        .then(({ data }) => {
          this.data = data.results;
          this.totalRows = data.count;
          this.loading = false;
        })
        .catch((error) => {
          this.data = [];
          this.totalRows = 0;
          this.loading = false;
          throw error;
        });
    },
    requestDelete(data) {
      this.$buefy.dialog.confirm({
        title: 'Deleting account',
        message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          // this.$buefy.toast.open('Account deleted!');
          this.$router.push(`${this.resourceUrl}${data.id}/delete`);
        },
      });
    },
  },
  watch: {
    resourceUrl() {
      this.initTable();
    },
  },
  mounted() {
    this.initTable();
  },
};

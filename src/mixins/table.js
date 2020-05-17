import toastsService from '../services/toasts';

export default {
  data() {
    return {
      resourceUrl: undefined,
      editRouteName: undefined,
      data: [],
      currentPage: 1,
      totalRows: 0,
      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      loading: true,
      query: '',
    };
  },
  computed: {
    order() {
      return this.sortOrder === 'desc' ? '-' : '';
    },
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
        `ordering=${this.order}${this.sortField}`,
      ];

      if (this.query) {
        params.push(`search=${this.query}`);
      }

      this.loading = true;
      this.$http.get(`${this.resourceUrl}?${params.join('&')}`)
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
        message: 'Are you sure you want to <b>delete</b>? This action cannot be undone.',
        confirmText: 'Delete Account',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteData(data);
        },
      });
    },
    deleteData(data) {
      this.$http.delete(`${this.resourceUrl}/${data.id}`).then(() => {
        toastsService.alertDeleteSuccess();
      }).catch((error) => {
        console.error(error);
        toastsService.alertDeleteError();
      });
    },
  },
  watch: {
    resourceUrl() {
      this.initTable();
    },
    query() {
      this.initTable();
    },
  },
  mounted() {
    this.initTable();
  },
};

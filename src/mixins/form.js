import toastsService from '@/services/toasts';

export default {
  data() {
    return {
      resourceUrl: undefined,
      data: {},
      id: undefined,
      loading: false,
    };
  },
  methods: {
    initData() {
      if (this.resourceUrl && this.id) {
        this.fetchData();
      }
    },
    save(data) {
      this.data = data;
      if (!this.resourceUrl) {
        return;
      }
      if (this.id === undefined || this.id === null) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    fetchData() {
      this.loading = true;
      this.$http.get(`${this.resourceUrl}/${this.id}`).then(this.fetchSuccess.bind(this)).catch(this.fetchError.bind(this));
    },
    saveData() {
      this.loading = true;
      this.$http.post(`${this.resourceUrl}`, this.data).then(this.saveSuccess.bind(this)).catch(this.saveError.bind(this));
    },
    updateData() {
      this.loading = true;
      this.$http.put(`${this.resourceUrl}/${this.id}`, this.data).then(this.saveSuccess.bind(this)).catch(this.saveError.bind(this));
    },
    fetchSuccess({ data }) {
      this.data = data;
      this.loading = false;
    },
    fetchError(error) {
      this.data = {};
      console.error(error);
      this.loading = false;
      toastsService.alertFetchError();
    },
    saveSuccess({ data }) {
      this.data = data;
      this.loading = false;
      toastsService.alertSaveSuccess();
      this.$router.replace({ params: { id: data.id } });
    },
    saveError(error) {
      console.error(error);
      this.loading = false;
      toastsService.alertSaveError();
    },
    updateId() {
      const id = +this.$route.params.id;
      this.id = undefined;
      this.data = {};
      if (!Number.isNaN(id)) {
        this.id = id;
        this.initData();
      }
      if (this.updatedId) {
        this.updatedId();
      }
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.id'() {
      this.updateId();
    },
  },
  mounted() {
    this.updateId();
  },
};

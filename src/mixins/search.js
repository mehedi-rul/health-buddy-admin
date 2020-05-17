export default {
  data() {
    return {
      searchRouteName: undefined,
      query: undefined,
    };
  },
  methods: {
    search(query) {
      if (this.query === query || !this.searchRouteName) {
        return;
      }
      this.query = query;
      this.$router.push({ name: this.searchRouteName, query: { query: this.query } });
    },
    updateQuery() {
      this.query = this.$route.query.query;
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.query.query'() {
      this.updateQuery();
    },
  },
  mounted() {
    this.updateQuery();
  },
};

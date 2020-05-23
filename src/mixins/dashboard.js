import { mapState } from 'vuex';
import dashboardChartMixin from './dashboard-chart';

export default {
  mixins: [dashboardChartMixin],
  data() {
    return {
      loading: true,
      period: 'all',
      interactions: 0,
      totalAsks: 0,
      allFlows: 0,
    };
  },
  computed: {
    ...mapState(['serverUrl']),
    rapidProUrl() {
      return `${this.serverUrl}proxy/rapidpro/`;
    },
  },
  methods: {
    fetchData() {
      if (!this.serverUrl) {
        return;
      }
      this.loading = true;
      this.fetchAll()
        .then((results) => {
          this.loading = false;
          const [
            interactions,
            totalAsks,
            allFlows,
            visitorsAccesses,
            usersAccesses,
            dailyTraffic,
            totalAnswers,
            totalErrors,
            registeredFakes,
          ] = results;
          this.interactions = interactions;
          this.totalAsks = totalAsks;
          this.allFlows = allFlows;
          this.dailyTrafficData = this.makeDailyTrafficData(visitorsAccesses, usersAccesses);
          this.messageMetricsData = this.makeMessageMetricsData(
            totalAsks,
            totalAnswers,
            totalErrors,
          );
          console.log(dailyTraffic);
          this.reportsData = this.makeReportsData(0, registeredFakes, 0);
        });
    },
    fetchAll() {
      return Promise.all([
        this.fetchInteractions(),
        this.fetchTotalAsks(),
        this.fetchAllFlows(),
        this.fetchVisitorsAccesses(),
        this.fetchUsersAccesses(),
        this.fetchDailyTraffic(),
        this.fetchTotalAnswers(),
        this.fetchTotalErrors(),
        this.fetchRegisteredFakes(),
      ]);
    },
    fetchInteractions() {
      return this.$http.get(`${this.rapidProUrl}flows?uuid=f7015954-1564-4e44-84f0-124843428498`)
        .then(({ data }) => this.parseTotalInteractions(data));
    },
    fetchTotalAsks() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => this.countMessages(data, 'incoming'));
    },
    fetchAllFlows() {
      return this.$http.get(`${this.rapidProUrl}flows?uuid=5f80320a-9122-4798-9056-0d999771841a`)
        .then(({ data }) => this.parseAllFlows(data));
    },
    fetchVisitorsAccesses() {
      return Promise.resolve(0);
    },
    fetchUsersAccesses() {
      return Promise.resolve(0);
    },
    fetchDailyTraffic() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => this.parseDailyTraffic(data));
    },
    fetchTotalAnswers() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => this.countMessages(data, 'outgoing'));
    },
    fetchTotalErrors() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => this.countMessages(data, 'errors'));
    },
    fetchRegisteredFakes() {
      return this.$http.get(`${this.rapidProUrl}labels?uuid=d6621bb6-9918-4128-80cf-3c2d3b981978`)
        .then(({ data }) => this.parseRegisteredFakes(data));
    },
    parseTotalInteractions(data) {
      const { runs } = data.results[0] || { runs: { active: 0, completed: 0, interrupted: 0 } };
      return runs.active + runs.completed + runs.interrupted;
    },
    countMessages(data, type) {
      const { results } = data;
      const dailyCountList = results.map((result) => result.daily_count);
      const filteredMessages = dailyCountList.map(
        (dc) => dc.find((d) => d.name.toLowerCase() === type),
      );
      const counts = filteredMessages.reduce(
        (current, previous) => current.concat(previous.data),
        [],
      );
      return counts.reduce((current, previous) => current + previous.count, 0);
    },
    parseAllFlows(data) {
      const { runs } = data.results[0] || { runs: { active: 0, completed: 0, interrupted: 0 } };
      return runs.completed;
    },
    parseDailyTraffic() {
      return 0;
    },
    parseRegisteredFakes(data) {
      const { count } = data.results[0] || { count: 0 };
      return count;
    },
  },
};

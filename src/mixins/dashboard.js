import { mapGetters } from 'vuex';
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
      pageViews: 0,
    };
  },
  computed: {
    ...mapGetters(['rapidProUrl', 'googleAnalyticsUrl']),
  },
  methods: {
    fetchData() {
      if (!this.rapidProUrl) {
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
            pageViews,
            totalAnswers,
            totalErrors,
            registeredFakes,
          ] = results;
          this.interactions = interactions;
          this.totalAsks = totalAsks;
          this.allFlows = allFlows;
          this.pageViews = pageViews;
          this.messageMetricsData = this.makeMessageMetricsData(
            totalAsks,
            totalAnswers,
            totalErrors,
          );
          this.reportsData = this.makeReportsData(0, registeredFakes, 0);
        });
    },
    fetchAll() {
      return Promise.all([
        this.fetchInteractions(),
        this.fetchTotalAsks(),
        this.fetchAllFlows(),
        this.fetchVisitorsAccesses(),
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
        .then(({ data }) => this.countMessages(data, 'outgoing'));
    },
    fetchAllFlows() {
      return this.$http.get(`${this.rapidProUrl}flows?uuid=5f80320a-9122-4798-9056-0d999771841a`)
        .then(({ data }) => this.parseAllFlows(data));
    },
    fetchVisitorsAccesses() {
      return this.$http.get(`${this.googleAnalyticsUrl}?start_date=365daysAgo&end_date=today&metrics=pageviews`)
        .then(({ data }) => this.parsePageViews(data));
    },
    fetchTotalAnswers() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => this.countMessages(data, 'incoming'));
    },
    fetchTotalErrors() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => this.countMessages(data, 'errors'));
    },
    fetchRegisteredFakes() {
      return this.$http.get(`${this.rapidProUrl}labels?uuid=f5b6ad36-6ec7-4bf1-913c-a3484e7c5b3f`)
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
    parseRegisteredFakes(data) {
      const { count } = data.results[0] || { count: 0 };
      return count;
    },
    parsePageViews(data) {
      return data.totalsForAllResults['ga:pageviews'];
    },
  },
};

// Interact with Bot -> podemos filtrar por período,
// mas não escolhemos o canal (web, telegram, etc...)

// Total Asks -> podemos filtrar por período,
// e podemos escolher o canal (web, telegram, etc...)

// All flow on Bot -> podemos filtrar por período,
// mas não escolhemos o canal (web, telegram, etc...)

// Daily Traffic -> mudar nome para Total traffic, a princípio
// poderá ser filtrado por período. Preciso estudar o google analytics

// Message Metrics -> podemos filtrar por período e
// podemos escolher o canal (web, telegram, etc...)

// New reports registreds -> Os tipos são: Low confidence response,
// New question e Reported Rumors. Porém por enquanto só existe o
// Reported Rumors no bot. Não poderá ser filtrado período, nem canal.

// O UUID do Interact with Bot e do All flow on Bot são definidos
// pelo cliente (unicef). Se houver mudanças, eles precisaram nos informar.

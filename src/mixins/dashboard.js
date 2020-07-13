import { mapGetters } from 'vuex';
import dashboardChartMixin from './dashboard-chart';

export default {
  mixins: [dashboardChartMixin],
  data() {
    const startPeriod = new Date();
    const endPeriod = new Date();
    startPeriod.setFullYear(endPeriod.getFullYear() - 1);
    return {
      loading: true,
      startPeriod,
      endPeriod,
      selectedPeriod: 'year',
      periods: ['today', 'month', 'year'],
      interactions: 0,
      totalAsks: 0,
      allFlows: 0,
      pageViews: 0,
      totalAnswers: 0,
      totalErrors: 0,
      newQuestions: 0,
      registeredFakes: 0,
      lowConfidenceResponses: 0,
      oldestTime: new Date(2019, 5, 2),
    };
  },
  computed: {
    ...mapGetters(['rapidProUrl', 'googleAnalyticsUrl']),
    fromDate() {
      return `from ${this.getStartDate().toLocaleDateString('en-US')}`;
    },
  },
  methods: {
    changePeriod(period) {
      this.selectedPeriod = period;
      this.fetchData();
    },
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
            allFlows,
            pageViews,
            registeredFakes,
            newQuestions,
            lowConfidenceResponses,
            totalAsksByPeriod,
            totalAsks,
            totalAnswers,
            totalErrors,
          ] = results;
          this.interactions = interactions;
          this.totalAsks = totalAsksByPeriod;
          this.allFlows = allFlows;
          this.pageViews = pageViews;
          this.totalAnswers = totalAnswers;
          this.totalErrors = totalErrors;
          this.newQuestions = newQuestions;
          this.registeredFakes = registeredFakes;
          this.lowConfidenceResponses = lowConfidenceResponses;
          this.messageMetricsData = this.makeMessageMetricsData(
            totalAsks,
            totalAnswers,
            totalErrors,
          );
          this.reportsData = this.makeReportsData(
            newQuestions,
            registeredFakes,
            lowConfidenceResponses,
          );
        });
    },
    fetchAll() {
      return Promise.all([
        this.fetchInteractions(),
        this.fetchAllFlows(),
        this.fetchVisitorsAccesses(),
        this.fetchRegisteredFakes(),
        this.fetchNewQuestions(),
        this.fetchLowConfidenceResponses(),
        this.fetchChannelStats(),
      ]).then((result) => {
        const totalAsksByPeriod = this.countMessages(
          result[6],
          'incoming',
          this.getFormattedStartDate(),
          this.getFormattedEndDate(),
        );
        const totalAsks = this.countMessages(result[6], 'incoming');
        const totalAnswers = this.countMessages(result[6], 'outgoing');
        const totalErrors = this.countMessages(result[6], 'errors');
        return [...result.slice(0, 6), totalAsksByPeriod, totalAsks, totalAnswers, totalErrors];
      });
    },
    fetchInteractions() {
      const queryParams = [
        'uuid=f7015954-1564-4e44-84f0-124843428498',
        `after=${this.getFormattedStartDate()}`,
        `before=${this.getFormattedEndDate()}`,
      ].join('&');
      return this.$http.get(`${this.rapidProUrl}flows?${queryParams}`)
        .then(({ data }) => this.parseTotalInteractions(data));
    },
    fetchAllFlows() {
      const queryParams = [
        'uuid=5f80320a-9122-4798-9056-0d999771841a',
        `after=${this.getFormattedStartDate()}`,
        `before=${this.getFormattedEndDate()}`,
      ].join('&');
      return this.$http.get(`${this.rapidProUrl}flows?${queryParams}`)
        .then(({ data }) => this.parseAllFlows(data));
    },
    fetchVisitorsAccesses() {
      const queryParams = [
        `start_date=${this.getGAStartDate()}`,
        `end_date=${this.getGAEndDate()}`,
        'metrics=pageviews',
      ].join('&');
      return this.$http.get(`${this.googleAnalyticsUrl}?${queryParams}`)
        .then(({ data }) => this.parsePageViews(data));
    },
    fetchRegisteredFakes() {
      return this.$http.get(`${this.rapidProUrl}labels?uuid=f5b6ad36-6ec7-4bf1-913c-a3484e7c5b3f`)
        .then(({ data }) => this.parseRegisteredFakes(data));
    },
    fetchNewQuestions() {
      return this.$http.get(`${this.rapidProUrl}labels?uuid=69361321-fbfd-4389-b114-22b047d20b43`)
        .then(({ data }) => this.parseRegisteredFakes(data));
    },
    fetchLowConfidenceResponses() {
      return this.$http.get(`${this.rapidProUrl}labels?uuid=9a9707f2-21fd-46f2-85ef-e34db3c35d09`)
        .then(({ data }) => this.parseRegisteredFakes(data));
    },
    fetchChannelStats() {
      return this.$http.get(`${this.rapidProUrl}channel_stats`)
        .then(({ data }) => data);
    },
    parseTotalInteractions(data) {
      const { runs } = data.results[0] || { runs: { active: 0, completed: 0, interrupted: 0 } };
      return runs.active + runs.completed + runs.interrupted;
    },
    countMessages(data, type, after = undefined, before = undefined) {
      const { results } = data;
      const dailyCountList = results.map((result) => result.daily_count);
      const filteredMessages = dailyCountList.map(
        (dc) => dc.find((d) => d.name.toLowerCase() === type),
      );
      const counts = filteredMessages.reduce(
        (current, previous) => current.concat(previous.data),
        [],
      );

      if (!after) {
        return counts.reduce((current, previous) => current + previous.count, 0);
      }
      return counts
        .filter((count) => {
          if (!before) {
            return count.date >= after;
          }
          return count.date >= after && count.date <= before;
        })
        .reduce((current, previous) => current + previous.count, 0);
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
    getFormattedStartDate() {
      return this.getStartDate().toISOString();
    },
    getFormattedEndDate() {
      return this.getEndDate().toISOString();
    },
    getStartDate() {
      return this.startPeriod;
    },
    getEndDate() {
      return this.endPeriod;
    },
    getGAStartDate() {
      const diffTime = Math.abs(new Date() - this.startPeriod);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays}daysAgo`;
    },
    getGAEndDate() {
      const diffTime = Math.abs(new Date() - this.endPeriod);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays}daysAgo`;
    },
  },
  watch: {
    startPeriod() {
      this.fetchData();
    },
    endPeriod() {
      this.fetchData();
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

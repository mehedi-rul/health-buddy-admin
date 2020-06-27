<template>
  <section class="dashboard">
    <ilha-header>
    </ilha-header>
    <b-loading
      :is-full-page="false"
      :active.sync="loading">
    </b-loading>
    <div class="periods-container m-2 m-t-1 m-b-1">
      <b-button
        v-for="(period, i) of periods"
        :key="i"
        :outlined="period !== selectedPeriod"
        @click="changePeriod(period)"
        type="is-primary"
        class="periods-container__button">
        {{ period }}
      </b-button>
    </div>
    <div
      v-if="!loading"
      class="m-2 m-t-1">
      <div class="m-b-1">
        <ilha-title>
          Overview
        </ilha-title>
        <div class="columns  m-t-1 m-b-1">
          <div class="column is-3">
            <ilha-summary-box class="has-background-blue has-text-white">
              <template v-slot:icon>
                <ilha-icon type="tag-white" class="icon is-medium"/>
              </template>
              <template v-slot:period>
                {{ selectedPeriod }}
              </template>
              <template v-slot:metric>
                <span title="Total number of conversations on the Bot.">Total Interactions</span>
              </template>
              <template v-slot:amount>
                {{ interactions }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column is-3">
            <ilha-summary-box class="has-background-yellow has-text-white">
              <template v-slot:icon>
                <ilha-icon type="users-white" class="icon is-medium"/>
              </template>
              <template v-slot:period>
                {{ selectedPeriod }}
              </template>
              <template v-slot:metric>
                <span title="The number of asked questions.">Total questions</span>
              </template>
              <template v-slot:amount>
                {{ totalAsks }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column is-3">
            <ilha-summary-box class="has-background-green has-text-white">
              <template v-slot:icon>
                <ilha-icon type="trend-white" class="icon is-medium"/>
              </template>
              <template v-slot:period>
                {{ selectedPeriod }}
              </template>
              <template v-slot:metric>
                <span title="Total number of conversations completed on the Bot">
                  Total complete Interaction
                </span>
              </template>
              <template v-slot:amount>
                {{ allFlows }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column is-3">
            <ilha-summary-box class="has-background-red has-text-white">
              <template v-slot:icon>
                <ilha-icon type="trend-white" class="icon is-medium"/>
              </template>
              <template v-slot:period>
                {{ selectedPeriod }}
              </template>
              <template v-slot:metric>
                <span title="The number of times the website has been accessed">Total Views</span>
              </template>
              <template v-slot:amount>
                {{ pageViews }}
              </template>
            </ilha-summary-box>
          </div>
        </div>
      </div>
      <div class="m-t-1">
        <ilha-title>
          Secondary
        </ilha-title>
        <div class="columns m-t-1 m-b-1">
          <div class="column is-half">
            <ilha-chart-summary-box
              :chart-data="messageMetricsData"
              class="has-background-white">
              <template v-slot:title>
                <span title="Traffic number for incoming, outgoing, and failed messages.">
                  Message Metrics
                </span>
              </template>
            </ilha-chart-summary-box>
          </div>
          <div class="column is-half">
            <ilha-chart-summary-box
              :chart-data="reportsData"
              class="has-background-white">
              <template v-slot:title>
                <span title="The number of registered reports.">
                  New Reports Registered
                </span>
              </template>
            </ilha-chart-summary-box>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import dashboardMixin from '../mixins/dashboard';

export default {
  mixins: [dashboardMixin],
  computed: {
    ...mapState(['serverUrl']),
  },
  methods: {
  },
  watch: {
    serverUrl() {
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
@import "../assets/styles/variables";
.loading-overlay {
  left: $sidebar-width;

  @media screen and (max-width: 1023px) {
      left: $sidebar-mobile-width;
  }
}

.dashboard {
  /deep/ .search-field {
    opacity: 0;
    input {
      display: none;
    }
  }
}

.periods-container {
  text-align: right;
  &__button {
    margin: 0 0.2em;
  }
}

</style>

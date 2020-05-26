<template>
  <section class="dashboard">
    <ilha-header>
    </ilha-header>
    <b-loading
      :is-full-page="false"
      :active.sync="loading">
    </b-loading>
    <div
      v-if="!loading"
      class="m-2 m-t-1">
      <div class="m-b-1">
        <ilha-title>
          Overview
        </ilha-title>
        <div class="columns m-t-1 m-b-1">
          <div class="column">
            <ilha-summary-box class="has-background-primary has-text-white">
              <template v-slot:title>
                <ilha-icon type="tag-white" class="icon is-medium"/>
              </template>
              <template v-slot:details>
                View details
              </template>
              <template v-slot:period>
                {{ period }}
              </template>
              <template v-slot:metric>
                Interact with Bot
              </template>
              <template v-slot:amount>
                {{ interactions }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column">
            <ilha-summary-box class="has-background-warning has-text-white">
              <template v-slot:title>
                <ilha-icon type="users-white" class="icon is-medium"/>
              </template>
              <template v-slot:details>
                View details
              </template>
              <template v-slot:period>
                {{ period }}
              </template>
              <template v-slot:metric>
                Total Asks
              </template>
              <template v-slot:amount>
                {{ totalAsks }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column">
            <ilha-summary-box class="has-background-success has-text-white">
              <template v-slot:title>
                <ilha-icon type="trend-white" class="icon is-medium"/>
              </template>
              <template v-slot:details>
                View details
              </template>
              <template v-slot:period>
                {{ period }}
              </template>
              <template v-slot:metric>
                All flow on Bot
              </template>
              <template v-slot:amount>
                {{ allFlows }}
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
          <div class="column is-one-third ">
            <ilha-chart-summary-box
              :chart-data="dailyTrafficData"
              class="has-background-white">
              <template v-slot:title>
                Daily Traffic
              </template>
            </ilha-chart-summary-box>
          </div>
          <div class="column is-one-third ">
            <ilha-chart-summary-box
              :chart-data="messageMetricsData"
              class="has-background-white">
              <template v-slot:title>
                Message Metrics
              </template>
            </ilha-chart-summary-box>
          </div>
          <div class="column is-one-third ">
            <ilha-chart-summary-box
              :chart-data="reportsData"
              class="has-background-white">
              <template v-slot:title>
                New Reports Registered
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

</style>

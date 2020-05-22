<template>
  <section class="dashboard">
    <ilha-header>
    </ilha-header>
    <div class="m-2 m-t-1">
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
                today
              </template>
              <template v-slot:metric>
                Interact with Bot
              </template>
              <template v-slot:amount>
                1231
              </template>
            </ilha-summary-box>
          </div>
          <div class="column">
            <ilha-summary-box class="has-background-warning has-text-white">
              <template v-slot:title>
                <ilha-icon type="users-white" class="icon is-medium"/>
              </template>
              <template v-slot:details>
                Total Asks
              </template>
              <template v-slot:period>
                today
              </template>
              <template v-slot:metric>
                Interact with Bot
              </template>
              <template v-slot:amount>
                1231
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
                today
              </template>
              <template v-slot:metric>
                All flow on Bot
              </template>
              <template v-slot:amount>
                1231
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

export default {
  data() {
    return {
      dailyTrafficData: [
        {
          label: 'Visitors',
          value: 90,
          backgroundColor: '#2FA2F4',
        },
        {
          label: 'Users',
          value: 10,
          backgroundColor: '#F8C239',
        },
      ],
      messageMetricsData: [
        {
          label: 'Sent',
          value: 50,
          backgroundColor: '#374EA2',
        },
        {
          label: 'Received',
          value: 30,
          backgroundColor: '#1CABE2',
        },
        {
          label: 'Fail',
          value: 10,
          backgroundColor: '#E2231A',
        },
      ],
      reportsData: [
        {
          label: 'Fake',
          value: 57,
          backgroundColor: '#2FA2F4',
        },
        {
          label: 'Rumors',
          value: 36,
          backgroundColor: '#F8C239',
        },
        {
          label: 'New',
          value: 15,
          backgroundColor: '#F7652B',
        },
      ],
    };
  },
  computed: {
    ...mapState(['serverUrl']),
  },
  methods: {
    fetchData() {
      if (!this.serverUrl) {
        // return;
      }
    },
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
// this.$http.get(`${this.serverUrl}proxy/rapidpro/flows?uuid=ab06f98c-84d5-479e-9511-f03ac61ba233`)
// .then(({ result }) => {
// console.log(result);
// });
</script>

<style lang="scss" scoped="true">

.summary {
  border: solid 1px white;
  border-radius: 5px;
  &__header {
    margin: 0;
    border-bottom: 1px solid white;
    .column {
      padding: 0.3em;
      &:last-child {
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 1px solid white;
      }
    }

  }
}
</style>

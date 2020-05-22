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
          <ilha-summary-box class="column">
            <template v-slot:icon>
              oi
            </template>
            <template v-slot:details>
              View details
            </template>
            <template v-slot:period>
              today
            </template>
            <template v-slot:title>
              Interact with Bot
            </template>
            <template v-slot:amount>
              1231
            </template>
          </ilha-summary-box>
          <ilha-summary-box class="column has-background-warning">
            <template v-slot:icon>
              oi
            </template>
            <template v-slot:details>
              View details
            </template>
            <template v-slot:period>
              today
            </template>
            <template v-slot:title>
              Total Asks
            </template>
            <template v-slot:amount>
              1231
            </template>
          </ilha-summary-box>
          <ilha-summary-box class="column has-background-success">
            <template v-slot:icon>
              oi
            </template>
            <template v-slot:details>
              View details
            </template>
            <template v-slot:period>
              today
            </template>
            <template v-slot:title>
              All flow on Bot
            </template>
            <template v-slot:amount>
              1231
            </template>
          </ilha-summary-box>
        </div>
      </div>
      <div class="m-t-1">
        <ilha-title>
          Secondary
        </ilha-title>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
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

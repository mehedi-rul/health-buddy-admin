<template>
  <section class="dashboard">
    <ilha-header>
    </ilha-header>
    <b-loading
      :is-full-page="false"
      :active.sync="loading">
    </b-loading>
    <button @click="downloadPdf">Exportar PDF</button>
    <div
      v-if="!loading"
      class="m-2 m-t-1" id="painel-graficos">
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
                {{ period }}
              </template>
              <template v-slot:metric>
                <span title="Interact with Bot">Interact with Bot</span>
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
                {{ period }}
              </template>
              <template v-slot:metric>
                <span title="Total Asks">Total Asks</span>
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
                {{ period }}
              </template>
              <template v-slot:metric>
                <span title="All flow on Bot">All flow on Bot</span>
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
                {{ period }}
              </template>
              <template v-slot:metric>
                <span title="Total Traffic">Total Traffic</span>
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
                Message Metrics
              </template>
            </ilha-chart-summary-box>
          </div>
          <div class="column is-half">
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
import * as JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import dashboardMixin from '../mixins/dashboard';

export default {
  mixins: [dashboardMixin],
  computed: {
    ...mapState(['serverUrl']),
  },
  methods: {
    downloadPdf() {
      html2canvas(document.querySelector('#painel-graficos')).then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const pdf = new JsPDF('l', 'px', 'a4');
        const widthWithMargin = pdf.internal.pageSize.getWidth() - 60;
        const heigthWithMargin = pdf.internal.pageSize.getHeight() - 60;
        pdf.addImage(img, 'png', 30, 30, widthWithMargin, heigthWithMargin);
        pdf.save('dashboard.pdf');
      });
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

</style>

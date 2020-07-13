<template>
  <section class="dashboard">
    <ilha-header>
    </ilha-header>
    <b-loading
      :is-full-page="false"
      :active="loading || downloading">
    </b-loading>
    <div class="dashboard-actions m-2 m-t-1 m-b-0">
      <div class="columns">
        <b-field class="column">
          <b-datepicker
            v-model="startPeriod"
            ref="startDatepicker"
            expanded
            placeholder="Start">
          </b-datepicker>
          <b-button
            @click="$refs.startDatepicker.toggle()"
            icon-left="calendar-today"
            type="is-primary" />
        </b-field>
        <b-field class="column">
          <b-datepicker
            v-model="endPeriod"
            ref="endDatepicker"
            expanded
            placeholder="End">
          </b-datepicker>
          <b-button
            @click="$refs.endDatepicker.toggle()"
            icon-left="calendar-today"
            type="is-primary" />
        </b-field>
      </div>
      <div class="columns">
        <div class="column">
          <b-button
            @click="downloadPdf"
            outlined
            type="is-primary"
            class="periods-container__button"
          >
            Export PDF
          </b-button>
        </div>
        <div class="column">
          <b-button
            @click="downloadCSV"
            outlined
            type="is-primary"
            class="periods-container__button"
          >
            Export CSV
          </b-button>
        </div>
      </div>
    </div>
    <div
      v-if="!loading"
      class="m-2 m-t-1" id="chart-panel">
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
              <template v-slot:metric>
                <span title="Total number of conversations on the Bot.">Total Interactions</span>
              </template>
              <template v-slot:amount>
                {{ interactions | toUSD }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column is-3">
            <ilha-summary-box class="has-background-yellow has-text-white">
              <template v-slot:icon>
                <ilha-icon type="users-white" class="icon is-medium"/>
              </template>
              <template v-slot:metric>
                <span title="The number of asked questions.">Total questions</span>
              </template>
              <template v-slot:amount>
                {{ totalAsks | toUSD }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column is-3">
            <ilha-summary-box class="has-background-green has-text-white">
              <template v-slot:icon>
                <ilha-icon type="trend-white" class="icon is-medium"/>
              </template>
              <template v-slot:metric>
                <span title="Total number of conversations completed on the Bot">
                  Total complete Interaction
                </span>
              </template>
              <template v-slot:amount>
                {{ allFlows | toUSD }}
              </template>
            </ilha-summary-box>
          </div>
          <div class="column is-3">
            <ilha-summary-box class="has-background-red has-text-white">
              <template v-slot:icon>
                <ilha-icon type="trend-white" class="icon is-medium"/>
              </template>
              <template v-slot:period>
                <span :title="fromDate">{{ selectedPeriod }}</span>
              </template>
              <template v-slot:metric>
                <span title="The number of times the website has been accessed">Total Views</span>
              </template>
              <template v-slot:amount>
                {{ pageViews | toUSD }}
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
import * as JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import dashboardMixin from '../mixins/dashboard';

export default {
  mixins: [dashboardMixin],
  computed: {
    ...mapState(['serverUrl']),
  },
  data() {
    return {
      downloading: false,
    };
  },
  methods: {
    downloadPdf() {
      this.downloading = true;
      html2canvas(document.querySelector('#chart-panel')).then((canvas) => {
        const img = canvas.toDataURL('image/png');
        const pdf = new JsPDF('l', 'px', 'a4');
        const widthWithMargin = pdf.internal.pageSize.getWidth() - 60;
        const heigthWithMargin = pdf.internal.pageSize.getHeight() - 60;
        pdf.addImage(img, 'png', 30, 30, widthWithMargin, heigthWithMargin);
        pdf.save('dashboard.pdf');
        this.downloading = false;
      });
    },
    downloadCSV() {
      this.downloading = true;
      const rows = [
        ['metric', 'value'],
        ['interactions', this.interactions],
        ['totalAsks', this.totalAsks],
        ['allFlows', this.allFlows],
        ['pageViews', this.pageViews],
        ['totalAnswers', this.totalAnswers],
        ['totalErrors', this.totalErrors],
        ['newQuestions', this.newQuestions],
        ['registeredFakes', this.registeredFakes],
        ['lowConfidenceResponses', this.lowConfidenceResponses],
      ];
      this.exportToCsv('dashboard.csv', rows);
      this.downloading = false;
    },
    exportToCsv(filename, rows) {
      const csvFile = rows.map((row) => this.processRow(row)).join('\n');

      const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    processRow(row) {
      let finalVal = '';
      for (let j = 0; j < row.length; j += 1) {
        let innerValue = row[j] === null ? '' : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        }
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
          result = `"${result}"`;
        }
        if (j > 0) {
          finalVal += ',';
        }
        finalVal += result;
      }
      return `${finalVal}`;
    },
  },
  filters: {
    toUSD(value) {
      return `${(+value).toLocaleString('en-US')}`;
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

.ilha-sidebar__reduced {
  .loading-overlay {
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

.dashboard-actions {
  display: flex;
  > div:last-child {
    margin-left: auto !important;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
}

</style>

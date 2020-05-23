export default {
  data() {
    return {
      dailyTrafficData: [],
      messageMetricsData: [],
      reportsData: [],
    };
  },
  methods: {
    makeDailyTrafficData(visitorsAccesses, usersAccesses) {
      return [
        {
          label: 'Visitors',
          value: visitorsAccesses,
          backgroundColor: '#2FA2F4',
        },
        {
          label: 'Users',
          value: usersAccesses,
          backgroundColor: '#F8C239',
        },
      ];
    },
    makeMessageMetricsData(totalSent, totalReceived, totalFail) {
      return [
        {
          label: 'Sent',
          value: totalSent,
          backgroundColor: '#374EA2',
        },
        {
          label: 'Fail',
          value: totalFail,
          backgroundColor: '#E2231A',
        },
        {
          label: 'Received',
          value: totalReceived,
          backgroundColor: '#1CABE2',
        },
      ];
    },
    makeReportsData(totalNew, totalFakes, totalRumors) {
      return [
        {
          label: 'Fake',
          value: totalFakes,
          backgroundColor: '#F7652B',
        },
        {
          label: 'New',
          value: totalNew,
          backgroundColor: '#2FA2F4',
        },
        {
          label: 'Rumors',
          value: totalRumors,
          backgroundColor: '#F8C239',
        },
      ];
    },
  },
};

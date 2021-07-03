<template>
  <line-chart
    class="chart"
    v-if="loaded"
    :chartdata="chartdata"
    :options="options"/>
</template>

<script>
// eslint-disable-next-line import/extensions
import LineChart from '../charts/LineChart.js';

export default {
  name: 'DailyStatistic',
  components: {
    LineChart,
  },
  // Update der Daten alle zehn Sekunden
  mounted() {
    this.getStats();
    setInterval(() => {
      this.getStats();
    }, 10000);
  },
  methods: {
    // überschreiben der Datensätze und generieren von Punkten zu den entsprechenden Daten
    getStats() {
      this.axios.get('/dashboard/getStats', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        this.recordings = [];
        this.recLabels = [];
        this.recData = [];
        const now = new Date();
        res.data.forEach((e) => {
          const date = new Date(parseInt(e.time, 10));
          if (now.toLocaleDateString() === date.toLocaleDateString()) {
            this.recordings.push(e);
            this.recLabels.push(date.toLocaleDateString());
            this.recData.push(e.conz);
          }
        });
        this.loaded = true;
        this.chartdata = {
          labels: this.recLabels,
          datasets: [
            {
              label: 'Data One',
              fill: false,
              borderColor: '#4BE9FF',
              data: this.recData,
            },
          ],
        };
      }).catch((err) => console.log(err));
    },
  },
  // Variablen erstellen und Graph konfigurieren
  data() {
    return {
      chartdata: null,
      recordings: [],
      recLabels: [],
      recData: [],
      loaded: false,
      locale: 'de-DE',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        cubicInterpolationMode: false,
        elements: {
          line: {
            tension: 0,
          },
          point: {
            radius: 0,
          },
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              display: false,
            },
            scaleLabel: {
              display: false,
              labelString: 'Month',
            },
          }],
          yAxes: [{
            display: true,
            ticks: {
              reverse: false,
              min: 0,
              // max: 100,
              display: true,
            },
            scaleLabel: {
              display: false,
              labelString: 'Value',
            },
          }],
        },
      },
    };
  },
};
</script>

<style scoped>
.chart {
  height: 50%;
  width: 95%;
  margin-right: 5%;
}
</style>

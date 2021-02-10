<template>
  <bar-chart
    class="chart"
    v-if="loaded"
    :chartdata="chartdata"
    :options="options"/>
</template>

<script>
// eslint-disable-next-line import/extensions
import BarChart from '../charts/BarChart.js';

export default {
  name: 'WeeklyStatistic',
  components: {
    BarChart,
  },
  //Update der Daten alle zehn Sekunden
  mounted() {
    this.getStats();
    setInterval(() => {
      this.getStats();
    }, 10000);
  },
  methods: {
    // Ruft Daten aus Datenbank ab
    getStats() {
      this.axios.get('/dashboard/getStats').then((res) => {
        const arr = [];
        const now = Date.now();
        res.data.forEach((e) => {
          //Nur die Daten der letzten sieben Tage pushen
          if (now - e.time < 604800000) {
            arr.push(e);
          }
        });
        this.recordings = arr;
        this.loaded = true;
        this.chartdata = {
          labels: this.recLabels,
          datasets: [
            {
              label: 'Data One',
              fill: false,
              backgroundColor: '#B0AFF2',
              data: this.recData,
            },
          ],
        };
      });
    },
  },
  computed: {
    //generieren von Beschriftungen von Balken
    recLabels() {
      let temp = [];
      this.recordings.forEach((e) => {
        const date = new Date(e.time * 1);
        temp.push(date.toLocaleDateString('de-DE', { weekday: 'long' }));
      });
      // eslint-disable-next-line no-shadow
      temp = temp.map((temp) => temp);
      temp = temp.filter((a, b) => temp.indexOf(a) === b);
      return temp;
    },
    //berechnen des Tagesdurchschnitts und erstellen der Balken
    recData() {
      const temp = [];
      this.recLabels.forEach((day) => {
        let dayCnt = 0;
        let daySum = 0;
        this.recordings.forEach((e) => {
          const date = new Date(e.time * 1);
          const dateS = date.toLocaleDateString('de-DE', { weekday: 'long' });
          if (day === dateS) {
            daySum += e.conz;
            dayCnt += 1;
          }
        });
        temp.push(daySum / dayCnt);
      });
      return temp;
    },
  },
   //Variablen erstellen und Graph konfigurieren
  data() {
    return {
      chartdata: null,
      loaded: false,
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
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              display: true,
            },
            scaleLabel: {
              display: false,
              labelString: 'Month',
            },
          }],
          yAxes: [{
            display: true,
            ticks: {
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
  height: 100%;
  width: 95%;
  margin-right: 5%;
}
</style>

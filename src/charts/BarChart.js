import { Bar } from 'vue-chartjs';
// erstellen des 7-Tage Balkendiagramm
export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  // aneu rendern des Diagrams wenn sich die Daten verändern
  watch: {
    chartdata() {
      this.renderChart(this.chartdata, this.options);
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};

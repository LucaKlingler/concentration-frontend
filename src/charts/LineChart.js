import { Line } from 'vue-chartjs';

// erstellen des täglichen Liniendiagramm
export default {
  extends: Line,
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
  // neu rendern des Diagrams wenn sich die Daten verändern
  watch: {
    chartdata() {
      this.renderChart(this.chartdata, this.options);
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};

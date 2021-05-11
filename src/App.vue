<template>
  <router-view/>
</template>

<script>
// const { ipcRenderer } = require('electron').remote;

export default {
  data() {
    return {
      concentration: null,
      lastPingTs: null,
    };
  },
  mounted() {
    // startet die Pings
    this.ping();
    window.ipc.on('keylogger', (payload) => {
      this.$store.state.concentration = payload.data * 1;
      console.log(payload);
    });
    // startet Tsimer
    setInterval(() => {
      if (this.$store.state.timerEn) {
        this.$store.state.timer += 1;
        if (this.$store.state.concentration === 0
          && (Date.now() - this.lastPingTs) > 1000 * 60 * 3) {
          this.lastPingTs = Date.now();
          console.log('ping');
          this.testPing();
        }
        if (this.$store.state.concentration === 1) this.lastPingTs = 0;
        // console.log('data:', concentrationString);
      }
    }, 1000);
  },
  methods: {
    ping() {
      // Aufmerksamkeitsping zwischen 5 und 15 Minuten
      // const timeout = 10000; // 15 min = 900
      const timeout = (Math.random() * 600000) + 300000; // 15 min = 900000
      setTimeout(() => {
        if (!this.$store.state.testing) {
          this.ping();
          return;
        }
        this.testPing();
        this.ping();
      }, timeout);
    },
  },
};
</script>

<style lang="scss">

</style>

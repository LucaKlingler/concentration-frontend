<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    //startet die Pings
    this.ping();
    //startet Timer
    setInterval(() => {
      if (this.$store.state.timerEn) {
        this.$store.state.timer += 1;
      }
    }, 1000);
  },
  methods: {
    ping() {
      //Aufmerksamkeitsping zwischen 5 und 15 Minuten
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

<template>
   <div id="class">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view style="min-height: 90vh;"/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>

<script>
// const { ipcRenderer } = require('electron').remote;
import { FadeTransition } from 'vue2-transitions';

export default {
  components: {
    FadeTransition,
  },
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
      // console.log(payload);
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

<style>

:root {
  --background-color: #2F2F2F;
}

body {
  background-color: var(--background-color);
}

.text {
    color: white;
  }

/* Menu / NavBar Styles */
.menu {
  -webkit-app-region: drag;
  background: black;
  width: 100vw;
}

.menuIcon {
  width: 1rem;
  height: 1rem;
  color: #ffffff;
}

.menuItem {
  padding: 0;
  width: 3.125rem;
  height: 3.125rem;
}

</style>

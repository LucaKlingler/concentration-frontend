<template>
   <div id="class">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view style="min-height: 90vh;" class="app" />
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
      mqttMsg: undefined,
      concentration: null,
      lastPingTs: null,
    };
  },
  mqtt: {
    /*
    lsd(msg) {
      this.mqttMsg = JSON.parse(msg.toString());
      // port 8000 für ws mqtt
    },
    */
  },
  mounted() {
    // startet die Pings
    this.ping();
    this.$mqtt.subscribe('lsd');
    this.$mqtt.publish('/laborwoche/test', 'Hello World!');
    this.$store.state.role = localStorage.getItem('role');
    window.ipc.on('keylogger', (payload) => {
      this.$store.state.concentration = payload.data * 1;
      console.log(payload);
    });
    // startet Tsimer
    if (this.$store.state.timerEn) {
      if (this.$store.state.concentration === 0
        && (Date.now() - this.lastPingTs) > 1000 * 60 * 3) {
        this.lastPingTs = Date.now();
        console.log('ping');
        this.testPing();
      }
      if (this.$store.state.concentration === 1) this.lastPingTs = 0;
      // console.log('data:', concentrationString);
    }
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

@font-face {
  font-family: "SanFrancisco";
  font-weight: 400;
  src: url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff");
}

:root {
  --background-color: #2F2F2F;
  overflow: hidden;
  font-family: "San Francisco";
}

body {
  background-color: var(--background-color);
  /*font-family: SanFrancisco;*/
  /*
  padding: 1rem;
  background: transparent;
  */
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

.confirmButton {
  width: 100%;
  height: 141px;
  border-radius: 0px;
  background-color: #716EFF;
  color: white;
  font-size: 18pt;
  font-weight: 700;
  cursor: pointer;
}

.confirmButtonDisabled {
  opacity: 0.7;
  cursor: not-allowed !important;
}

.input {
  background-color:#B2B2B2;
  border-radius: 5px;
}

.input.form-control {
  color: var(--background-color);
}
.input.form-control::placeholder {
  color: white;
}

</style>

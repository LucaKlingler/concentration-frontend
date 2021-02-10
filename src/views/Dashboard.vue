<template>
  <div class="dbwrapper text">
    <b-container fluid>
      <b-row>
        <b-col cols="2">
          <!-- Menu -->
          <Menu/>
        </b-col>
        <b-col cols="9">
          <div class="dbcontent">
            <!-- Einbinden eines "testpings" zur vereinfachten Entwicklung und Demonstration -->
            <h2 @click="testPing">Dashboard</h2>
            <b-row>
              <b-col cols="6" class="dbboxwrapper">
                <div :class="{ dbbox: true, dbboxActive: $store.state.testing }">
                  <b-button v-if="$store.state.testing === false"
                    @click="startTest">Messung starten</b-button>
                  <b-button v-if="$store.state.testing === true" variant="danger"
                    @click="stopTest">Messung stoppen</b-button>
                  <br><br>
                  <p>Messung läuft seit: {{timerS}}</p>
                </div>
              </b-col>
              <b-col cols="6" class="dbboxwrapper">
                <div class="dbbox">
                  <!-- einbinden des Vue Kalenders in kleiner Form -->
                  <vue-cal xsmall active-view="day" :disable-views="['years', 'year', 'month']"
                  class="cal" />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="dbboxwrapper">
                <div class="dbbox">
                  <p>Test Historie</p>
                  <p>
                    <span v-for="e in history" :key="e.start">{{e.start}}:
                      {{e.dir}} Sek. - {{e.fails}} Fehler<br></span>
                  </p>
                </div>
              </b-col>
              <b-col cols="6" class="dbboxwrapper" style="cursor: pointer;"
                @click="$router.push('/statistics')">
                <div class="dbbox">
                  Heutige Statistik
                  <DailyStatistic class="chart"/>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col cols="1" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import Notification from 'node-mac-notifier';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import Menu from '../components/Menu.vue';
import DailyStatistic from '../components/DailyStatistic.vue';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    DailyStatistic,
    VueCal,
  },
  data() {
    return {
      history: [],
    };
  },
  //updaten der Daten alle 10 Sekunden
  mounted() {
    this.getHistory();
    setInterval(() => {
      this.getHistory();
    }, 10000);
  },
  methods: {
    startTest() {
      this.$store.state.testing = true;
      this.$store.state.timerEn = true;
    },
    stopTest() {
      this.$store.state.testing = false;
      this.$store.state.timerEn = false;
      this.$store.state.timer = 0;
    },
    //greift die letzten Testergebnisse aus dem Backend ab und zeigt sie an
    getHistory() {
      this.axios.get('/dashboard/getHistory').then((res) => {
        this.history = [];
        res.data.forEach((e) => {
          const startD = new Date(parseInt(e.start, 10));
          const start = startD.toLocaleString();
          const dir = Math.round((e.end - e.start) / 1000);
          const { fails } = e;
          this.history.push({
            start, dir, fails,
          });
        });
      });
    },
  },
  computed: {
    //verbesserung des Timers (statt 65 Sekunden -> 1 Minute 5 Sekunden, 1 Sekunden -> 1 Sekunde)
    timerS() {
      const time = this.$store.state.timer;
      let out;
      if (time === 1) {
        out = '1 Sekunde';
      } else if (time === 60) {
        out = '1 Minute';
      } else if (time < 60) {
        out = `${time} Sekunden`;
      } else if (time > 120) {
        out = `${Math.floor(time / 60)} Minuten, ${time % 60} Sekunden`;
      } else if (time > 60) {
        out = `${Math.floor(time / 60)} Minute, ${time % 60} Sekunden`;
      } else {
        out = `${Math.floor(time / 60)} Minuten, ${time % 60} Sekunden`;
      }
      return out;
    },
  },
};
</script>
<style scoped>
  .text {
    color: white;
  }
  .dbwrapper {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(180deg, #1C2A4D 0%, #000000 100%);
  }

  .dbcontent {
    height: 90vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

  .dbboxwrapper
  {
    padding: 1rem;
  }
  .dbbox {
    padding: 1rem;
    background: #303A53;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .dbboxActive {
    border: 2px solid green;
  }

  .chart {
    height: 150px;
  }

  .cal {
    height: 250px;
    width: 100%;
  }

  .stoppen {
    color: red;
  }

  .starten {
    color: green;
  }
</style>

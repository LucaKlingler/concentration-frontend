<template>
  <div class="d-flex text">
    <div class="align-self-center" style="width: 100%;">
      <b-row>
        <b-col cols="6">
          <b-row :style="{ height: `${rowHeight}px` }">
            <b-col class="dbButton" ref="dbButton">
            <div class="dbButtonContainer d-flex justify-content-center"
            style="background-color: #469D4F;">
              <div class="dbButtonContents align-self-center">
                <img class="dbButtonIcon" src="@/assets/icons/start.svg" alt="" srcset="">
                <br>
                Messung starten
              </div>
            </div>
            </b-col>

            <b-col class="dbButton">
              <div class="dbButtonContainer d-flex justify-content-center">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/join-meeting.svg" alt="" srcset="">
                  <br>
                  Meeting beitreten
              </div>
            </div>
            </b-col>
          </b-row>

          <b-row :style="{ height: `${rowHeight}px` }">
            <b-col class="dbButton">
              <div class="dbButtonContainer d-flex justify-content-center">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/statistics.svg" alt="" srcset="">
                  <br>
                  Statistiken
              </div>
            </div>
            </b-col>
            <b-col class="dbButton">
              <div class="dbButtonContainer d-flex justify-content-center">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/calendar.svg" alt="" srcset="">
                  <br>
                  Kalender
              </div>
            </div>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="6">
          <b-row>
            <p>Letzte Messung</p>
          </b-row>
          <b-row class="dbBlockWrapper">
            <div class="dbBlockContainer">
              <b-row class="" style="color: black;">
                <b-col>
                  <p>
                    Prototyping / Redesign
                    <br>
                    (Do, 243634)
                  </p>
                </b-col>
                <b-col>
                  <b-row>
                    <b-col>
                      7 aufgaben
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      84%
                    </b-col>
                  </b-row>
                </b-col>
                <b-col>
                  <b-row>
                    <b-col>
                      2h
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      3 fehler
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-row>
        </b-col>

      </b-row>
    </div>
  </div>
</template>

<script>
// import Notification from 'node-mac-notifier';
// import VueCal from 'vue-cal';
// import 'vue-cal/dist/vuecal.css';
// import DailyStatistic from '../components/DailyStatistic.vue';

export default {
  name: 'Dashboard',
  components: {
    // DailyStatistic,
    // VueCal,
  },
  data() {
    return {
      history: [],
      loaded: false,
    };
  },
  // updaten der Daten alle 10 Sekunden
  mounted() {
    this.getHistory();
    setInterval(() => {
      this.getHistory();
    }, 10000);
    this.loaded = true;
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
    // greift die letzten Testergebnisse aus dem Backend ab und zeigt sie an
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
    // verbesserung des Timers (statt 65 Sekunden -> 1 Minute 5 Sekunden, 1 Sekunden -> 1 Sekunde)
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
    rowHeight() {
      if (!this.loaded) return 100;
      return this.$refs?.dbButton?.clientWidth;
    },
  },
};
</script>
<style scoped>

  .dbButton {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding: 2rem;
  }
  .dbButtonContainer {
    background-color: #716EFF;
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }
  .dbButtonContents {
    color: white;
    text-align: center;
  }
  .dbButtonIcon {
    width: 40%;
  }
  .dbBlockWrapper {
    width: 100%;
    padding: 1rem;
  }
  .dbBlockContainer {
    width: 100%;
    border-radius: 20px;
    background-color: white;
  }

.dbwrapper {
    width: 100vw;
    height: 100vh;
    overflow: scroll;
  }

  .dbcontent {
    height: 90vh;
    margin-top: 3vh;
    margin-bottom: 5vh;
  }

  .dbboxwrapper
  {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .dbbox {
    padding: 1rem;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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
  .startMeassurement {
    background: #CD972E;
    border-radius: 10px;
    padding: 1rem;
  }
</style>

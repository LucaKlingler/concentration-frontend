<template>
  <div class="db d-flex text">
    <div class="align-self-center" style="width: 100%;">
      <b-row>
        <b-col>

          <b-row :style="{ height: `${rowHeight}px` }">
            <b-col cols="3" class="dbButton" ref="dbButton">
              <div class="dbButtonContainer d-flex justify-content-center dbButtonContainerGreen"
                @click="startTest" v-if="$store.state.testing === false">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/start.svg"
                    style="color:red;" alt="" srcset=""/>
                  <br>
                  Messung starten
                </div>
              </div>
              <div class="dbButtonContainer d-flex justify-content-center dbButtonContainerRed"
              @click="stopTest"               v-if="$store.state.testing === true">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/start.svg" alt="" srcset="">
                  <br>
                  Messung stoppen
                </div>
              </div>
            </b-col>

            <b-col class="dbButton" cols="3">
              <div class="dbButtonContainer d-flex justify-content-center">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/join-meeting.svg" alt="" srcset="">
                  <br>
                  Meeting beitreten
                </div>
              </div>
            </b-col>

            <b-col cols="6">
              <b-row class="dbBlock" style="height: 100%;">
                <b-col class="d-flex flex-column">
                  <b-row>
                    <p style="margin: 0px">{{ $store.state.testing === true
                      ? 'Aktuelle Messung' : 'Letzte Messung'}}</p>
                  </b-row>
                  <b-row class="dbBlockWrapper flex-grow-1">
                    <div class="dbBlockContainer"
                    :style="{ border: $store.state.testing === true ? '3px solid #B81A1C' : '' }">
                      <b-row style="color: black; height: 100%;">
                        <b-col class="d-flex">
                          <p class="align-self-center" style="margin:0">
                            <span class="dbBlockTitle">Prototyping/Redesign</span>
                            <br>
                            <span class="dbBlockSubtitle">(Donnerstag, 06 Mai 2021)</span>
                          </p>
                        </b-col>
                        <b-col class="d-flex">
                          <div class="d-flex flex-grow-1">
                            <div class="align-self-center">
                              <img class="dbBlockIcon" src="@/assets/icons/tasks.svg">
                              {{history.length}} Aufgaben
                              <br><br>
                              <img class="dbBlockIcon" src="@/assets/icons/concentration.svg">
                              {{$store.state.concentration === -1 ? 'Kalibriert'
                                : `${$store.state.concentration}%`}}
                            </div>
                          </div>
                        </b-col>
                        <b-col class="d-flex">
                          <div class="d-flex flex-grow-1">
                            <div class="align-self-center">
                              <img class="dbBlockIcon" src="@/assets/icons/time.svg">
                              {{timerS}}
                              <br><br>
                              <img class="dbBlockIcon" src="@/assets/icons/mistakes.svg">
                              {{failureCount}} Fehler
                            </div>
                          </div>
                        </b-col>
                      </b-row>
                    </div>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>

          </b-row>

          <b-row :style="{ height: `${rowHeight}px` }">
            <b-col cols="3" class="dbButton">
              <div class="dbButtonContainer d-flex justify-content-center"
                @click="$router.push('/statistics')">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/statistics.svg" alt="" srcset="">
                  <br>
                  Statistiken
                </div>
              </div>
            </b-col>

            <b-col cols="3" class="dbButton">
              <div class="dbButtonContainer d-flex justify-content-center"
                @click="$router.push('/calendar')">
                <div class="dbButtonContents align-self-center">
                  <img class="dbButtonIcon" src="@/assets/icons/calendar.svg" alt="" srcset="">
                  <br>
                  Kalender
                </div>
              </div>
            </b-col>

            <b-col cols="6">
              <b-row class="dbBlock" style="height: 100%;">
                <b-col class="d-flex flex-column">
                  <b-row>
                    <p style="margin: 0px">Next Up</p>
                  </b-row>
                  <b-row style="height: 1rem;"/>
                  <b-row class="dbBlockWrapper flex-grow-1" style="padding-top: 0rem;">
                    <div class="dbBlockContainer">
                      <b-row class="" style="height: 100%; color: black;">
                        <b-col class="d-flex">
                          <div class="align-self-center">
                            <span class="dbBlockTitle">Prototyping/Redesign</span>
                            <br>
                            <span class="dbBlockSubtitle">(Donnerstag, 06 Mai 2021)</span>
                          </div>
                        </b-col>
                        <b-col>
                          <b-row style="height: 100%">
                            <b-col class="d-flex align-self-center">
                              <span class="dbBlockTime">9:00 - 12:00</span>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                  </b-row>
                  <b-row style="height: 1rem;"/>
                  <b-row class="dbBlockWrapper flex-grow-1">
                    <div class="dbBlockContainer">
                      <b-row class="" style="height: 100%; color: black;">
                        <b-col class="d-flex">
                          <div class="align-self-center">
                            <span class="dbBlockTitle">Prototyping/Redesign</span>
                            <br>
                            <span class="dbBlockSubtitle">(Donnerstag, 06 Mai 2021)</span>
                          </div>
                        </b-col>
                        <b-col>
                          <b-row style="height: 100%">
                            <b-col class="d-flex align-self-center">
                              <span class="dbBlockTime">9:00 - 12:00</span>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>

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
      timeNow: Date.now(),
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
    setInterval(() => {
      if (this.$store.state.timerEn) this.timeNow = Date.now();
    }, 500);
  },
  methods: {
    startTest() {
      this.$store.state.testing = true;
      this.$store.state.timerEn = true;
      this.$store.state.timer = Date.now();
      this.getHistory();
      this.ipc.send('startkeylogger', Date.now());
    },
    stopTest() {
      this.$store.state.testing = false;
      this.$store.state.timerEn = false;
      this.ipc.send('stopkeylogger', Date.now());
    },
    // greift die letzten Testergebnisse aus dem Backend ab und zeigt sie an
    getHistory() {
      this.axios.get(`/dashboard/getHistory?time=${this.$store.state.timer}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then((res) => {
        // console.log(res.data);
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
      // if (!this.$store.state.timerEn) return '00:00:00';
      const time = Math.floor((this.timeNow - this.$store.state.timer) / 1000);
      let out;
      if (time === 60) {
        out = '00:01:00';
      } else if (time === 3600) {
        out = '01:00:00';
      } else if (time < 60) {
        out = `00:00:${time.toString().padStart(2, '0')}`;
      } else if (time < 3600) {
        out = `00:${Math.floor(time / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
      } else if (time < 3660) {
        out = `${Math.floor(time / 3601).toString().padStart(2, '0')}:00:${(time % 60).toString().padStart(2, '0')}`;
      } else {
        out = `${Math.floor(time / 3600).toString().padStart(2, '0')}:${Math.floor((time - (3600 * Math.floor(time / 3600))) / 60).toString().padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
      }
      return out;
    },
    rowHeight() {
      if (!this.loaded) return 100;
      return this.$refs?.dbButton?.clientWidth;
    },
    failureCount() {
      const fails = this.history.map((e) => e.fails);
      return fails.reduce((a, b) => a + b, 0);
    },
  },
};
</script>
<style scoped>
  .db {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .dbButton {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding: 2rem;
  }
  .dbButtonContainer {
    cursor: pointer;
    background-color: #716EFF;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
  .dbButtonContainer:hover {
    background-color: #4846bb;
  }
  .dbButtonContainer:active {
    background-color: #716EFF;
  }
  .dbButtonContainerGreen {
    background-color: #469D4F;
  }
  .dbButtonContainerGreen:hover {
    background-color: #2f7235;
  }
  .dbButtonContainerGreen:active {
    background-color: #469D4F;
  }
  .dbButtonContainerRed {
    background-color: #B81A1C;
  }
  .dbButtonContainerRed:hover {
    background-color: #9e1113;
  }
  .dbButtonContainerRed:active {
    background-color: #B81A1C;
  }
  .dbButtonContents {
    color: white;
    text-align: center;
  }
  .dbButtonIcon {
    width: 3rem;
  }
  .dbBlock {
    padding-left: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .dbBlockWrapper {
    width: 100%;
    padding-top: 0.5rem;
  }
  .dbBlockContainer {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #D3D3D3;
  }
  .dbBlockTitle {
    font-size: 10pt;
    line-height: 1ch;
  }
  .dbBlockSubtitle {
    font-size: 7pt;
    font-weight: 300;
    line-height: 1ch;
  }
  .dbBlockSubtitle {
    font-size: 7pt;
    font-weight: 300;
    line-height: 1ch;
  }
  .dbBlockTime {
    font-size: 18pt;
    font-weight: 300;
    line-height: 1ch;
  }
  .dbBlockIcon {
    width: 1.5rem;
    margin-right: 0.5rem;
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
</styleonnerstag,>

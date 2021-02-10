<template>
  <div class="dbwrapper text">
    <b-container fluid>
      <b-row>
        <b-col cols="2">
          <Menu/>
        </b-col>
        <b-col cols="9">
          <div class="dbcontent">
            <h3>Statistiken</h3>
            <b-row>
              <b-col class="dbboxwrapper">
                <div class="dbbox">
                  <DailyStatistic class="chart"/>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="dbboxwrapper">
                <div class="dbbox">
                  <WeeklyStatistic class="chart"/>
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
import Menu from '../components/Menu.vue';
import DailyStatistic from '../components/DailyStatistic.vue';
import WeeklyStatistic from '../components/WeeklyStatistics.vue';

export default {
  name: 'Statistics',
  components: {
    Menu,
    DailyStatistic,
    WeeklyStatistic,
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
    position: fixed;
  }

  .dbcontent {
    height: 90vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

  .dbboxwrapper
  {
    height: 50%;
    max-height: 50%;
    padding: 1rem;
  }
  .dbbox {
    padding: 1rem;
    background: #303A53;
    width: 100%;
    border-radius: 10px;
  }
  .statcal {
    height: 50%;
  }
  .chart{
    width: 100%;
    height: 200px;
  }
</style>

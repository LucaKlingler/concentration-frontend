<template>
    <b-container class="dbwrapper text" fluid>
      <b-row>
        <b-col cols="12">
          <div class="dbcontent">
            <h3>Statistiken</h3>
            <b-row>
              <b-col class="dbboxwrapper">
                <div class="dbbox">
                  <p>Tagesansicht</p>
                  <DailyStatistic class="chart"/>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="dbboxwrapper">
                <div class="dbbox">
                  <p>Wochenansicht</p>
                  <WeeklyStatistic class="chart"/>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import DailyStatistic from '../components/DailyStatistic.vue';
import WeeklyStatistic from '../components/WeeklyStatistics.vue';

export default {
  name: 'Statistics',
  components: {
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

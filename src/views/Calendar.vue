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
            <b-row>
              <b-col>
                <h3>Kalender</h3>
                <!-- einbinden des Kalenders -->
                <vue-cal
                  style="height: 500px"
                  :time-from="8 * 60"
                  :time-to="22 * 60"
                  active-view="week"
                  :disable-views="['years', 'year']">
                </vue-cal>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
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
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import Menu from '../components/Menu.vue';

export default {
  name: 'Statistics',
  components: {
    Menu,
    VueCal,
  },
  data() {
    return {
    };
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
    background: #303A53;
    height: 90vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
  .calendar {
    height: 100%;
    width: 95%;
    margin-right: 5%;
  }
</style>

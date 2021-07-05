<template>
  <b-container fluid class="text">
    <b-row>
      <b-col>
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
  </b-container>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'Statistics',
  components: {
    VueCal,
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  .calendar {
    height: 100%;
    width: 95%;
    margin-right: 5%;
  }
</style>

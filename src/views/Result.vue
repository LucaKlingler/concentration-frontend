<template>
  <div class="captcha min-vh-100 d-flex flex-column">
    <b-container fluid>
    <b-row class="menu">
      <b-col cols="1">
        <WindowControls/>
      </b-col>
    </b-row>
    <b-row class="flex-grow-1">
      <b-col>
        <b-row style="margin-top: 5rem;">
          <b-col cols="3"/>
          <b-col>
            <img class="checkImg" src="@/assets/checkmarkresult.svg" alt="" srcset="">
          </b-col>
          <b-col cols="3"/>
        </b-row>
        <b-row style="margin-top: 4rem;">
          <b-col cols="2"/>
          <b-col>
            <p class="text title" style="text-align: center;">
              Du hast die Aufgabe richtig gelöst!
            </p>
          </b-col>
          <b-col cols="2"/>
        </b-row>
        <b-row style="margin-top: 3rem;">
          <b-col cols="2"/>
          <b-col>
            <p class="text">
              Reaktionszeit:
            </p>
          </b-col>
          <b-col>
            <p class="text title time">
              {{reactionTime}}s
            </p>
          </b-col>
          <b-col cols="2"/>
        </b-row>
        <b-row style="margin-top: 1rem;">
          <b-col cols="2"/>
          <b-col>
            <p class="text">
              Aufgabe gelöst in:
            </p>
          </b-col>
          <b-col>
            <p class="text title time">
              {{totalTime}}s
            </p>
          </b-col>
          <b-col cols="2"/>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
      </b-col>
    </b-row>
  </b-container>
  <b-button class="confirmButton"
    @click="window.close()">
    schließen
  </b-button>
  </div>
</template>

<script>
import WindowControls from '../components/WindowControls.vue';

export default {
  name: 'Result',
  components: {
    WindowControls,
  },
  data() {
    return {
      startTs: undefined,
      clickedTs: undefined,
      totalTime: undefined,
    };
  },
  mounted() {
    this.startTs = this.$route.query.startTs;
    this.clickedTs = this.$route.query.clickedTs;
    this.totalTime = parseFloat(this.$route.query.totalTime).toFixed(2);
  },
  computed: {
    reactionTime() {
      return ((this.clickedTs - this.startTs) / 1000).toFixed(2);
    },
  },
};
</script>

<style scoped>

.title {
  font-weight: 900;
}

.time {
  text-align: right
}

.checkImg {
  width: 100%;
  height: 100%;
}

</style>

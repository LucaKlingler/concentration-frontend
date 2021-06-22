<template>
  <b-container fluid class="captcha min-vh-100 d-flex flex-column">
  <b-row class="menu">
    <b-col cols="1">
      <WindowControls/>
    </b-col>
  </b-row>
  <b-row class="flex-grow-1">
    <b-col class="captchaContainer ">
      <Puzzle v-if="challenge === 0" :notificationTs="$route.query.ts"/>
      <Calculation v-if="challenge === 1" :notificationTs="$route.query.ts"/>
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Puzzle from '../components/Puzzle.vue';
import Calculation from '../components/Calculation.vue';
import WindowControls from '../components/WindowControls.vue';

export default {
  name: 'Home',
  data() {
    return {
      challenge: null,
    };
  },
  components: {
    Puzzle,
    Calculation,
    WindowControls,
  },
  created() {
    const challengeRand = Math.random() * 1;
    this.challenge = Math.round(challengeRand);
  },
};
</script>

<style scoped>

.captchaContainer {
 padding: 0;
}

</style>

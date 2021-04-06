<template>
  <div class="home">
    <Puzzle v-if="challenge === 0" :notificationTs="$route.query.ts"/>
    <Calculation v-if="challenge === 1" :notificationTs="$route.query.ts"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Puzzle from '../components/Puzzle.vue';
import Calculation from '../components/Calculation.vue';

export default {
  name: 'Home',
  data() {
    return {
      challenge: null,
    };
  },
  components: {
    Puzzle,
    Calculation
  },
  created() {
    const challengeRand = Math.random() * 1;
    this.challenge = Math.round(challengeRand);
  },
};
</script>

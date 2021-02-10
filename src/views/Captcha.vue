<template>
  <div class="home">
    <Puzzle :notificationTs="$route.query.ts"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Puzzle from '../components/Puzzle.vue';

export default {
  name: 'Home',
  components: {
    Puzzle,
  },
};
</script>

<template>
  <div>
    <div class="wrapper text">
      <span class="err">
        4
        <img class="err" src="@/assets/cross.svg" alt="0" srcset="">
        4
      </span>
      <p class="text">page not found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  components: {
  },
  data() {
    return {
      history: [],
    };
  },
  // updaten der Daten alle 10 Sekunden
};
</script>
<style scoped>

  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

 .err {
   display: flex;
   align-items:center;
   font-size: 30vh;
   height: 1.25ch;
 }
 .text {
   font-size: 50pt;
 }
</style>

<template>
  <b-row class="wc-wrapper">
    <b-col cols="1" class="wc-col">
      <div @click="handleWControls('close')" class="wc wc-close"></div>
    </b-col>
    <b-col cols="1" class="wc-col">
      <div @click="handleWControls('min')" class="wc wc-min"></div>
    </b-col>
    <b-col cols="1" class="wc-col">
      <div @click="handleWControls('max')" class="wc wc-max"></div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'WindowControls',
  methods: {
    handleWControls(mode) {
      window.ipc.send('window', mode);
    },
  },
};
</script>

<style scoped>
.wc-wrapper {
  height: 3.125rem;
  width: 7rem;
  position: relative;
}

.wc-col {
  width: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.wc {
  position: absolute;
  line-height: 3.125rem;
  margin-top: 1.0625rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  cursor: pointer;
}
.wc-close {
  background-color: #F96057;
}
.wc-min {
  background-color: #F8CE52;
}
.wc-max {
  background-color: #5FCF65;
}
</style>

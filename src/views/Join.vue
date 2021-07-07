<template>
  <div fluid class="d-flex flex-column text"
    style="background-color: var(--background-color);">
    <b-row class="flex-grow-1 d-flex justify-content-center">
      <div class="align-self-center text-center" style="width: 80vw;">
        <b-row>
          <b-col>
            <p class="title">Einem Meeting beitreten</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="text-left">Meeting-ID oder Einladungslink eingeben</p>
            <b-input style="margin-bottom: 1rem;" type="text" class="input" v-model="user"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-left">
            <p>Dein Name</p>
            <b-input type="password" v-model="pwd" class="input"/>
          </b-col>
        </b-row>
        <b-row style="margin: 1rem 0rem 2rem 0rem;">
          <b-col class="text-left">
            <b-form-checkbox switch size="lg">Keylogger</b-form-checkbox>
          </b-col>
          <b-col class="text-left">
            <b-form-checkbox switch size="lg">Aufgaben</b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="confirmButton" variant="primary"
            @click="ipc.send('openMeeting')">Teilnehmen</b-button>
          </b-col>
        </b-row>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data() {
    return {
    };
  },
  methods: {
  },
  computed: {
  },
  components: {
  },
};
</script>

<style scoped>

.title {
  margin-bottom: 2rem;
  font-size: 26pt;
  font-weight: 600;
}

.register {
  font-size: 18pt;
  margin-top: 2rem;
}

.input {
  font-size: 26pt;
  margin-bottom: 2rem;
}

.confirmButton {
  height: 4rem;
  border-radius: 5px;
  line-height: 26pt;
}

</style>

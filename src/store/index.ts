import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// Speichern von globalen Variablen
export default new Vuex.Store({
  state: {
    testing: false,
    timerEn: false,
    timer: Date.now(),
    concentration: 0,
    loggedIn: false,
    role: null,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

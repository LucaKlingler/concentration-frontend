import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// Speichern von globalen Variablen
export default new Vuex.Store({
  state: {
    testing: false,
    timerEn: false,
    timer: 0,
    concentration: null,
    loggedIn: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

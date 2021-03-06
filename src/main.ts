import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import './registerServiceWorker';
import axios from 'axios';
// import VueSocketIO from 'vue-socket.io';
import { ToastPlugin } from 'bootstrap-vue';
import VueAxios from 'vue-axios';
// import { ipcRenderer } from 'electron';
import App from './App.vue';
import router from './router/router';
import store from './store';

const { ipcRenderer } = window.require('electron');

Vue.use(ToastPlugin);

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://local.craftycram.net:45673/api/v1/';
// axios.defaults.baseURL = 'http://localhost:3011/api/v1/';
// axios.defaults.baseURL = 'http://10.10.1.62:3011/api/v1/';

Vue.mixin({
  methods: {
    toast: function toast(title, text, variant = null) {
      this.$bvToast.toast(text, {
        title,
        variant,
        solid: true,
        autoHideDelay: 2000,
        toaster: 'b-toaster-top-right',
        appendToast: false,
      });
    },
    // generiert Ping
    testPing: function testPing() {
      const myNotification = new Notification('Aufmerksamkeits-Ping', {
        body: 'Hier klicken um Test zu lösen',
      });
      myNotification.addEventListener('click', () => {
        ipcRenderer.send('openWindow');
      });
    },
  },
});

Vue.prototype.window = window;
Vue.prototype.ipc = ipcRenderer;

// check if loggedin
router.beforeEach(function cb(this: any, to, from, next) {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        name: 'Login',
      });
      this.toast('Es ist ein Fehler aufgetreten', 'Du musst dich zuerst anmelden!', 'danger');
      store.state.loggedIn = false;
    } else {
      next();
      store.state.loggedIn = true;
    }
  } else {
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

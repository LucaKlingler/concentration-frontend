import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import './registerServiceWorker';
import axios from 'axios';
// import VueSocketIO from 'vue-socket.io';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router/router';
import store from './store';

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://localhost:3011/api/v1/';

Vue.mixin({
  methods: {
    // generiert Ping
    testPing: function testPing() {
      const myNotification = new Notification('Aufmerksamkeits-Ping', {
        body: 'Hier klicken um Test zu lösen',
      });
      myNotification.addEventListener('click', () => {
        const params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=750,height=910,left=0,top=0';
        window.open(`/captcha?ts=${Date.now()}`, 'test', params);
      });
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

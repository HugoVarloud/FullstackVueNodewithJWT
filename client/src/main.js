import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import vuetify from './plugins/vuetify';
// import axios from "axios";

Vue.config.productionTip = false

//test token modifié
// store.dispatch('auth/attempt', localStorage.getItem('auth-token'))

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

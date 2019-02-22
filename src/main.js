import Vue from "vue";
import App from "@/App.vue";
import router from "@/router.js";
import VeeValidate from "vee-validate";
import store from "@/store.js";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(VeeValidate);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

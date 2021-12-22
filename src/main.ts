import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueSSE from "vue-sse";

Vue.config.productionTip = false;
Vue.use(VueSSE, {
  format: "json",
  polyfill: true,
  url: "http://localhost:2308/getKijo/BOMFUTURO_DEV/315",
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

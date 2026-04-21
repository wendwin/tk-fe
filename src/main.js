import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/css/main.css";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(createPinia()).use(Vue3Toastify).mount("#app");

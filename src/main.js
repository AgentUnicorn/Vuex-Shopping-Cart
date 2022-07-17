import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"

import "./assets/main.css"

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')


import "bootstrap/dist/js/bootstrap.js"
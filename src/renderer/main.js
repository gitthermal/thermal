import Vue from "vue"
import axios from "axios"

import App from "./App"
import router from "./router"
import store from "./store"
// vue2-scrollbar styles
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"
import "./assets/css/all.sass"

if (!process.env.IS_WEB) Vue.use(require("vue-electron"))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(require("vue-moment"))

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: "<App/>"
}).$mount("#app")

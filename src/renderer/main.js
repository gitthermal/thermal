import Vue from "vue"
import axios from "axios"

import App from "./App"
import router from "./router"
import store from "./store"
import "./assets/css/all.sass"
// vue2-scrollbar styles
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"

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

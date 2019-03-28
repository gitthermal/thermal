import Vue from "vue"
import axios from "axios"
import * as Sentry from "@sentry/electron"

import App from "./App"
import router from "./router"
import store from "./store"
// vue2-scrollbar styles
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"
import "./assets/css/all.sass"

Sentry.init({
	dsn: "https://c3fb5f4c94aa4921a71b5fb887e1cfac@sentry.io/1422446",
	integrations: [new Sentry.Integrations.Vue({
		Vue,
		attachProps: true
	})],
})

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

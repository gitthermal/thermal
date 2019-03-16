import Vue from "vue"
import Router from "vue-router"

import WelcomePage from "../components/WelcomePage"
import pageNotFound from "../components/pageNotFound"
import historyPage from "../components/history"

Vue.use(Router)

let routes = [
	{
		path: "/history",
		name: "historyPage",
		component: historyPage
	},
	{
		path: "/",
		name: "welcomePage",
		component: WelcomePage
	},
	{
		path: "/404",
		name: "pageNotFound",
		component: pageNotFound
	}
]

const router = new Router({
	base: "/",
	mode: "history",
	routes
})

export default router

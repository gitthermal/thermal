import Vue from "vue"
import Router from "vue-router"

import WelcomePage from "@/components/WelcomePage"
import pageNotFound from "@/components/pageNotFound"

Vue.use(Router)

let routes = [
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

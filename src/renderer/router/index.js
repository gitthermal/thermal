import Vue from "vue"
import Router from "vue-router"

import WelcomePage from "../components/WelcomePage"
import pageNotFound from "../components/pageNotFound"
import workspacePage from "../components/workspacePage"
import historyPage from "../components/history"

Vue.use(Router)

let routes = [
	{
		path: "/workspace",
		name: "workspace",
		component: workspacePage
	},
	{
		path: "/history",
		name: "history",
		component: historyPage
	},
	{
		path: "/",
		name: "welcome",
		component: WelcomePage
	},
	{
		path: "*",
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

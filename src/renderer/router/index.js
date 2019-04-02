import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

let routes = [
	{
		path: "/workspace",
		name: "workspace",
		component: require("../components/workspacePage").default
	},
	{
		path: "/history",
		name: "history",
		component: require("../components/history").default
	},
	{
		path: "/settings",
		name: "repositorySettings",
		component: require("../components/pages/repository/settings").default
	},
	{
		path: "/",
		name: "welcome",
		component: require("../components/WelcomePage").default
	},
	{
		path: "*",
		name: "pageNotFound",
		redirect: "/",
	}
]

const router = new Router({
	base: "/",
	mode: "history",
	routes
})

export default router

import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

let routes = [
	{
		path: "/repository",
		component: require("../pages/repository").default,
		children: [
			{
				path: "workspace",
				name: "repositoryWorkspace",
				component: require("../pages/repository/workspace").default
			},
			{
				path: "history",
				name: "repositoryHistory",
				component: require("../pages/repository/history").default
			},
			{
				path: "settings",
				name: "repositorySettings",
				component: require("../pages/repository/settings").default
			}
		]
	},
	{
		path: "/settings",
		name: "repositorySettings",
		component: require("../components/pages/repository/settings").default
	},
	{
		path: "/",
		name: "welcome",
		component: require("../pages/welcome").default
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

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [
	{
		path: "/repository/:projectId",
		component: require("../pages/repository").default,
		children: [
			{
				name: "repositoryWorkspace",
				path: "workspace/:branchName",
				component: require("../pages/repository/workspace").default
			},
			{
				name: "repositoryHistory",
				path: "commits/:branchName",
				component: require("../pages/repository/history").default
			},
			{
				path: "stats",
				name: "repositoryStats",
				component: require("../pages/repository/stats").default
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
		component: require("../pages/settings").default,
		children: [
			{
				path: "profile",
				name: "profileSettings",
				component: require("../pages/settings/profile").default
			},
			{
				path: "experimental",
				name: "experimentalFeatures",
				component: require("../pages/settings/experimental").default
			},
			{
				path: "information",
				name: "appInformation",
				component: require("../pages/settings/information").default
			}
		]
	},
	{
		path: "/",
		name: "welcome",
		component: require("../pages/welcome").default
	},
	{
		path: "*",
		name: "pageNotFound",
		redirect: "/"
	}
];

const router = new Router({
	base: "/",
	mode: "history",
	routes
});

export default router;

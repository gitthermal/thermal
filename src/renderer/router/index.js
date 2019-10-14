import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [
	{
		path: "/repository/:projectId",
		component: require("../pages/repository").default,
		children: [
			{
				path: "workspace/:branchName",
				name: "projectWorkspace",
				component: require("../pages/repository/workspace").default
			},
			{
				path: "commits/:branchName",
				name: "projectCommits",
				component: require("../pages/repository/commits").default
			},
			{
				path: "commit/:commitId",
				name: "projectCommitDetail",
				component: require("../pages/repository/commit").default
			},
			{
				path: "stats",
				name: "projectStats",
				component: require("../pages/repository/stats").default
			},
			{
				path: "settings",
				name: "projectSettings",
				component: require("../pages/repository/settings").default
			}
		]
	},
	{
		path: "/select",
		name: "selectRepository",
		component: require("../pages/selectRepository").default
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
		path: "/commands",
		name: "gitCommands",
		component: require("../pages/commands").default
	},
	{
		path: "/",
		name: "welcome",
		component: require("../pages/select").default
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

import Vue from "vue";
import axios from "axios";
import { init, getIntegrations } from "@sentry/electron";

import App from "./App";
import router from "./router";
import store from "./store";
// vue2-scrollbar styles
import "vue2-scrollbar/dist/style/vue2-scrollbar.css";
import "./assets/css/all.sass";
import packageJson from "../../package.json";

// database
import database from "../database";


database.serialize(() => {
	// create repository table
	database.run(
		`CREATE TABLE IF NOT EXISTS repository(
			repositoryId INTEGER PRIMARY KEY,
			repositoryName VARCHAR(30) NOT NULL,
			repositoryPath VARCHAR(150) NOT NULL
		);`
	);

	// create repository git table
	database.run(
		`CREATE TABLE IF NOT EXISTS gitRepository(
			gitId INTEGER PRIMARY KEY,
			isGit INTEGER NOT NULL,
			remoteUrl VARCHAR(200),
			activeBranch VARCHAR(50),
			repositoryId INTEGER NOT NULL,
			FOREIGN KEY(repositoryId) REFERENCES repository(repositoryId)
		)`
	);

	// create repository settings table
	database.run(
		`CREATE TABLE IF NOT EXISTS repositorySettings(
			settingsId INTEGER PRIMARY KEY,
			name VARCHAR(30) NOT NULL,
			description VARCHAR(200),
			directoryName VARCHAR(30) NOT NULL,
			directoryPath VARCHAR(150) NOT NULL,
			commitFeature INTEGER NOT NULL,
			remoteFeature INTEGER NOT NULL,
			repositoryId INTEGER NOT NULL,
			FOREIGN KEY(repositoryId) REFERENCES repository(repositoryId)
		)`
	);
});

const VueIntegration = getIntegrations().browser.Vue;
init({
	dsn: "https://c3fb5f4c94aa4921a71b5fb887e1cfac@sentry.io/1422446",
	integrations: [
		new VueIntegration({
			Vue,
			attachProps: true
		})
	],
	environment: process.env.NODE_ENV,
	release: `thermal@${packageJson.version}`
});

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(require("vue-moment"));

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: "<App/>"
}).$mount("#app");

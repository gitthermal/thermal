"use strict";

import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import * as Sentry from "@sentry/electron";
import packageJson from "../../package.json";

Sentry.init({
	dsn: "https://c3fb5f4c94aa4921a71b5fb887e1cfac@sentry.io/1422446",
	environment: process.env.NODE_ENV,
	release: `thermal@${packageJson.version}`
});

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
	global.__static = require("path")
		.join(__dirname, "/static")
		.replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:9080"
		: `file://${__dirname}/index.html`;

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000,
		frame: false,
		webPreferences: {
			devTools: true,
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(winURL);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", () => {
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

autoUpdater.on("update-downloaded", () => {
	autoUpdater.quitAndInstall();
});

app.on("ready", () => {
	if (process.env.NODE_ENV === "production") autoUpdater.checkForUpdates();
});

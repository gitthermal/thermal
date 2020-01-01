"use strict";

import { app, BrowserWindow } from "electron";
import * as Sentry from "@sentry/electron";
import packageJson from "../../package.json";

const buildMenu = require("./menu");
const CONFIG = require("./config");

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

let windowOptions = {};

if (process.platform === "darwin") {
	// TODO: Use `titleBarStyle: "hidden"` with custom created TitleBar.vue component for macOS
	windowOptions.titleBarStyle = "default";
} else {
	windowOptions.frame = false;
}

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: CONFIG.WINDOW_DEFAULT_HEIGHT,
		width: CONFIG.WINDOW_DEFAULT_WIDTH,

		// conditional data based on platform
		...windowOptions,

		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(winURL);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", () => {
	if (process.platform === "darwin") {
		buildMenu();
	}
	createWindow();
});

app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

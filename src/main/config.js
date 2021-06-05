const { app } = require("electron");

/**
 * Applications Configuration
 **/
module.exports = {
	APP_NAME: "Thermal",
	APP_VERSION: app.getVersion(),

	THERMAL_URL_WEBSITE: "https://thermal.codecarrot.net/",
	GITHUB_URL: "https://www.github.com/gitthermal/thermal",
	GITHUB_URL_LICENSE:
		"https://github.com/gitthermal/thermal/blob/master/LICENCE",
	GITHUB_URL_ISSUES:
		"https://github.com/gitthermal/thermal/issues/new?assignees=&labels=🐞+Bug&template=bug_report.md",
	GITHUB_URL_RELEASE_NOTES: "https://github.com/gitthermal/thermal/releases",
	DISCORD_INVITE_URL: "https://discord.gg/DcSNmts",

	WINDOW_DEFAULT_HEIGHT: 800,
	WINDOW_DEFAULT_WIDTH: 1200,

	ICON: "../../build/icons/256x256.png"
};

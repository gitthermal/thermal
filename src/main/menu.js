const { Menu, shell, dialog } = require("electron");
const CONFIG = require("./config");

/**
 * Menu template
 */

const template = [
	{
		label: CONFIG.APP_NAME,
		submenu: [
			{
				label: `About ${CONFIG.APP_NAME}`,
				click() {
					showAboutDialog();
				}
			},
			{
				label: "Preferences",
				click() {
					console.log("Open preferences page.");
				}
			},
			{ type: "separator" },
			{
				label: "Release notes",
				click() {
					shell.openExternal(CONFIG.GITHUB_URL_RELEASE_NOTES);
				}
			},
			{
				label: "License",
				click() {
					shell.openExternal(CONFIG.GITHUB_URL_LICENSE);
				}
			},
			{ type: "separator" },
			{
				label: "Check for updates...",
				click() {
					showUpdatesDialog();
				}
			},
			{ type: "separator" },
			{ role: "hide" },
			{ role: "hideOthers" },
			{ role: "unhide" },
			{ type: "separator" },
			{ role: "quit" }
		]
	},
	{
		label: "File",
		submenu: [
			{
				label: "Select repository"
			},
			{ type: "separator" },
			{
				label: "New repository"
			},
			{ type: "separator" },
			{
				label: "Add local repository"
			},
			{
				label: "Clone repository"
			},
			{ type: "separator" },
			{
				label: "Git commands"
			}
		]
	},
	{
		label: "Repository",
		submenu: [
			{
				label: "Push"
			},
			{
				label: "Pull"
			},
			{ type: "separator" },
			{
				label: "View on GitHub"
			},
			{
				label: "Open in Terminal"
			},
			{
				label: "Open in Finder"
			},
			{
				label: "Open in Visual Studio Code"
			},
			{ type: "separator" },
			{
				label: "Repository Settings"
			}
		]
	},
	{
		label: "View",
		submenu: [
			{
				label: "Show changes"
			},
			{
				label: "Show history"
			},
			{
				label: "Show branchs list"
			},
			{ type: "separator" },
			{
				label: "Toggle Full Screen",
				accelerator: (() => {
					if (process.platform === "darwin") {
						return "Ctrl+Command+F";
					} else {
						return "F11";
					}
				})(),
				click: function (focusedWindow) {
					if (focusedWindow) {
						focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				}
			},
			{
				label: "Toggle Developer Tools",
				accelerator: (function () {
					if (process.platform === "darwin") {
						return "Alt+Command+I";
					} else {
						return "Ctrl+Shift+I";
					}
				})(),
				click: function (item, focusedWindow) {
					if (focusedWindow) {
						focusedWindow.toggleDevTools();
					}
				}
			}
		]
	},
	{
		label: "Branch",
		submenu: [
			{
				label: "New branch"
			},
			{
				label: "Rename"
			},
			{
				label: "Delete"
			},
			{ type: "separator" },
			{
				label: "Discard all changes"
			},
			{ type: "separator" },
			{
				label: "Compare to branch"
			},
			{
				label: "Merge into current branch"
			},
			{
				label: "Rebase current branch"
			},
			{ type: "separator" },
			{
				label: "Compare on GitHub"
			},
			{
				label: "Show pull request"
			}
		]
	},
	{
		label: "Window",
		role: "window",
		submenu: [
			{
				label: "Minimize",
				accelerator: "CmdOrCtrl+M",
				role: "minimize"
			},
			{
				label: "Reload",
				accelerator: "CmdOrCtrl+R",
				role: "reload"
			},
			{
				label: "Close",
				accelerator: "CmdOrCtrl+W",
				role: "close"
			}
		]
	},
	{
		label: "Help",
		submenu: [
			{
				label: "Learn more",
				click() {
					shell.openExternal(CONFIG.THERMAL_URL_WEBSITE);
				}
			},
			{
				label: "Show keyboard shortcuts"
			},
			{ type: "separator" },
			{
				label: "Report an issue",
				click() {
					shell.openExternal(CONFIG.GITHUB_URL_ISSUES);
				}
			},
			{
				label: "Contact support",
				click() {
					shell.openExternal(CONFIG.DISCORD_INVITE_URL);
				}
			}
		]
	}
];

/**
 * Create menu
 */
function createMenu() {
	const menu = Menu.buildFromTemplate(template);
	return Menu.setApplicationMenu(menu);
}

/**
 * About dialog box
 */
function showAboutDialog() {
	dialog.showMessageBox({
		type: "info",
		title: `About ${CONFIG.APP_NAME}`,
		message: `${CONFIG.APP_NAME} ${CONFIG.APP_VERSION}`,
		detail: "All-in-one place to manage your Git repository."
	});
}

function showUpdatesDialog() {
	dialog.showMessageBox({
		type: "info",
		title: "Check for updates",
		message: `${CONFIG.APP_NAME} updates`,
		detail:
			"You can stay up to day with updates by checking the releases page on Thermal GitHub repository."
	});
}

module.exports = createMenu;

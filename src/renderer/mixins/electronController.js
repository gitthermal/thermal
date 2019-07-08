const { remote } = require("electron");
const win = remote.getCurrentWindow();

export default {
	methods: {
		close() {
			win.close();
		},
		minimize() {
			win.minimize();
		},
		maximize() {
			if (!win.isMaximized()) {
				win.maximize();
			} else {
				win.unmaximize();
			}
		}
	}
};

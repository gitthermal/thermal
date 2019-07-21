import store from "../store";

export default async (command, params) => {
	store.commit("commands/addCommand", {
		title: `git ${command} ${!!params === true ? params : ""}`,
		path: store.getters["workspace/currentRepository"].path,
		type: command
	});
};

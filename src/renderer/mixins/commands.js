import store from "../store";

export default async (command, params) => {
	store.commit("commands/addCommand", {
		command: command,
		params: !!params === true ? params : "",
		path: store.getters["workspace/currentRepository"].path,
		type: command
	});
};

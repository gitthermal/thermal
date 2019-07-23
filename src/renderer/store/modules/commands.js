const state = {
	commands: []
};

const getters = {
	allCommands: state => state.commands
};

const mutations = {
	addCommand(state, payload) {
		state.commands.push({
			command: payload.command,
			params: payload.params,
			path: payload.path,
			type: payload.type
		});
	},
	removeCommand(state, payload) {
		state.commands.splice(payload.index, 1);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations
};

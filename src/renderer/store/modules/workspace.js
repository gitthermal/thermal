import repository from "./repository";

const state = {
	workspaceRepository: {
		index: ""
	}
};

const getters = {
	currentRepository: state => {
		return repository.state.repositoryList[state.workspaceRepository.index];
	}
};

const mutations = {
	workspaceRepository(state, payload) {
		state.workspaceRepository.index = payload.index;
	}
};

const actions = {
	updateWorkspaceRepository: ({ commit }, payload) => {
		commit({
			type: "workspaceRepository",
			index: payload.index
		});
	},
	switchWorkspaceRepository: ({ commit }) => {
		commit({
			type: "workspaceRepository",
			index: ""
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};

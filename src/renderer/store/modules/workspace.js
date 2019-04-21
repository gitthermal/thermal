import repository from "./repository";

const state = {
	workspaceRepository: {
		index: ""
	},
	filePreview: {}
};

const getters = {
	currentRepository: state => repository.state.repositoryList[state.workspaceRepository.index],
	filePreview: state => state.filePreview
};

const mutations = {
	workspaceRepository(state, payload) {
		state.workspaceRepository.index = payload.index;
	},
	filePreview(state, payload) {
		state.filePreview = payload.preview;
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

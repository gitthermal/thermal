import repository from "./repository";

const state = {
	workspaceRepository: {
		index: ""
	},
	filePreview: {
		isActive: false,
		preview: []
	}
};

const getters = {
	currentRepository: state => repository.state.repositoryList[state.workspaceRepository.index],
	filePreview: state => state.filePreview.preview
};

const mutations = {
	workspaceRepository(state, payload) {
		state.workspaceRepository.index = payload.index;
	},
	toggleFilePreview(state, payload) {
		state.filePreview.isActive = payload.isActive;
	},
	filePreview(state, payload) {
		state.filePreview.preview = payload.preview;
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

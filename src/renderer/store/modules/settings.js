const state = {
	profile: {
		author: {
			name: "",
			username: "",
			imageUrl: ""
		}
	},
	experimental: {
		fileChanges: true
	}
};

const getters = {
	getExperimental: state => state.experimental
};

const mutations = {
	toggleFileChanges(state, payload) {
		state.experimental.fileChanges = payload.fileChanges;
	}
};

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};

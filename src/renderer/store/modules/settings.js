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
	getSettingsList(state) {
		if (localStorage.getItem("settings")) {
			state.profile = JSON.parse(localStorage.getItem("settings")).profile;
			state.experimental = JSON.parse(localStorage.getItem("settings")).experimental;
		}
	},
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

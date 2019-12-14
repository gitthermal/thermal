const state = {
	profile: {
		author: {
			name: "",
			email: "",
			imageUrl: ""
		}
	},
	experimental: {
		fileChanges: true,
		quickFilePreview: false
	}
};

const getters = {
	getProfile: state => state.profile,
	getExperimental: state => state.experimental
};

const mutations = {
	getSettingsList(state) {
		state.profile = JSON.parse(localStorage.getItem("settings")).profile;
		state.experimental = JSON.parse(
			localStorage.getItem("settings")
		).experimental;
	},
	setSettings(state) {
		localStorage.setItem("settings", JSON.stringify(state));
	},
	authorName(state, payload) {
		state.profile.author.name = payload.name;
	},
	authorEmail(state, payload) {
		state.profile.author.email = payload.email;
	},
	authorImage(state, payload) {
		state.profile.author.imageUrl = payload.image;
	},
	toggleFileChanges(state, payload) {
		state.experimental.fileChanges = payload.fileChanges;
	},
	toggleQuickFilePreview(state, payload) {
		state.experimental.quickFilePreview = payload.quickFilePreview;
	}
};

const actions = {
	updateAuthorName: ({ commit }, payload) => {
		commit({
			type: "authorName",
			name: payload.name
		});
		commit({
			type: "setSettings"
		});
	},
	updateAuthorEmail: ({ commit }, payload) => {
		commit({
			type: "authorEmail",
			email: payload.email
		});
		commit({
			type: "setSettings"
		});
	},
	updateAuthorImage: ({ commit }, payload) => {
		commit({
			type: "authorImage",
			image: payload.image
		});
		commit({
			type: "setSettings"
		});
	},
	updateFileChanges: ({ commit }, payload) => {
		commit({
			type: "toggleFileChanges",
			fileChanges: payload.fileChanges
		});
		commit({
			type: "setSettings"
		});
	},
	updateQuickFilePreview: ({ commit }, payload) => {
		commit({
			type: "toggleQuickFilePreview",
			quickFilePreview: payload.quickFilePreview
		});
		commit({
			type: "setSettings"
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

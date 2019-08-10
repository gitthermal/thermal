const state = {
	filePreview: {
		isActive: false,
		preview: []
	}
};

const getters = {
	filePreview: state => state.filePreview.preview
};

const mutations = {
	toggleFilePreview(state, payload) {
		state.filePreview.isActive = payload.isActive;
	},
	filePreview(state, payload) {
		state.filePreview.preview = payload.preview;
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

const state = {
	allRepository: []
};

const getters = {
	getAllRepository: state => state.allRepository
};

const mutations = {
	updateRepositoryList(state, payload) {
		state.allRepository = payload;
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

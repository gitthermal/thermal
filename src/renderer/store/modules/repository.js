const state = {
	allRepository: [],
	repositoryData: {}
};

const getters = {
	getAllRepository: state => state.allRepository,
	repositoryData: state => state.repositoryData
};

const mutations = {
	updateRepositoryList(state, payload) {
		state.allRepository = payload;
	},
	updateRepositoryData(state, payload) {
		state.repositoryData = payload;
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

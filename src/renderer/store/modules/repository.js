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
	/**
	 * updating repository isGit value to 0/1
	 * triggered after initalizing git repository
	 */
	updateIsGitStatus(state, payload) {
		for (
			let repositoryItem = 0;
			repositoryItem < state.allRepository.length;
			repositoryItem++
		) {
			const repository = state.allRepository[repositoryItem];
			if (payload.id === repository.repositoryId) {
				// converting boolean value to interger
				// updating the value in repository vuex store
				repository.isGit = +payload.isGit;
			}
		}
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

const state = {
	addLocalRepository: true,
	newRepository: false,
	about: false,
	exportCommitData: false,
	newRemote: false,
	cloneRepository: false
};

const getters = {};

const mutations = {
	toggleAddLocalRepositoryModel(state) {
		state.addLocalRepository = !state.addLocalRepository;
	},
	toggleAboutModel(state) {
		state.about = !state.about;
	},
	toggleExportCommitData(state) {
		state.exportCommitData = !state.exportCommitData;
	},
	toggleNewRemote(state) {
		state.newRemote = !state.newRemote;
	},
	toggleNewRepository(state) {
		state.newRepository = !state.newRepository;
	},
	toggleCloneRepository(state) {
		state.cloneRepository = !state.cloneRepository;
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

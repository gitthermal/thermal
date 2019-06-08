const state = {
	addLocalRepository: false,
	newRepository: false,
	about: false,
	exportCommitData: false,
	newRemote: false,
	cloneRepository: false
};

const getters = {};

const mutations = {
	toggleAddLocalRepositoryModal(state) {
		state.addLocalRepository = !state.addLocalRepository;
	},
	toggleAboutModal(state) {
		state.about = !state.about;
	},
	toggleExportCommitDataModal(state) {
		state.exportCommitData = !state.exportCommitData;
	},
	toggleNewRemoteModal(state) {
		state.newRemote = !state.newRemote;
	},
	toggleNewRepositoryModal(state) {
		state.newRepository = !state.newRepository;
	},
	toggleCloneRepositoryModal(state) {
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

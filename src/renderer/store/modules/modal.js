const state = {
	addLocalRepository: false,
	switchRepository: false,
	newRepository: false,
	about: false,
	exportCommitData: false,
	newRemote: false,
	cloneRepository: false,
	initializeGitRepository: false
};

const getters = {};

const mutations = {
	toggleAddLocalRepositoryModal(state, status) {
		state.addLocalRepository = status;
	},
	toggleSwitchRepositoryModal(state, status) {
		state.switchRepository = status;
	},
	toggleAboutModal(state, status) {
		state.about = status;
	},
	toggleExportCommitDataModal(state, status) {
		state.exportCommitData = status;
	},
	toggleNewRemoteModal(state, status) {
		state.newRemote = status;
	},
	toggleNewRepositoryModal(state, status) {
		state.newRepository = status;
	},
	toggleCloneRepositoryModal(state, status) {
		state.cloneRepository = status;
	},
	toggleInitializeGitRepositoryModal(state, status) {
		state.initializeGitRepository = status;
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

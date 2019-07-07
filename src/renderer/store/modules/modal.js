const state = {
	addLocalRepository: false,
	newRepository: false,
	about: false,
	exportCommitData: false,
	newRemote: false,
	cloneRepository: false,
	initalizeGitRepository: false
};

const getters = {};

const mutations = {
	toggleAddLocalRepositoryModal(state, status) {
		state.addLocalRepository = status;
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
	toggleInitalizeGitRepositoryModal(state, status) {
		state.initalizeGitRepository = status;
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

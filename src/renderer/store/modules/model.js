const state = {
	isActive: false,
	model: {
		addLocalRepository: false,
		newRepository: false,
		about: false,
		exportCommitData: false,
		newRemote: false,
		cloneRepository: false
	}
};

const getters = {};

const mutations = {
	toggleModelPlaceholder(state) {
		state.isActive = !state.isActive;
	},
	toggleAddLocalRepositoryModel(state) {
		state.model.addLocalRepository = !state.model.addLocalRepository;
	},
	toggleAboutModel(state) {
		state.model.about = !state.model.about;
	},
	toggleExportCommitData(state) {
		state.model.exportCommitData = !state.model.exportCommitData;
	},
	toggleNewRemote(state) {
		state.model.newRemote = !state.model.newRemote;
	},
	toggleNewRepository(state) {
		state.model.newRepository = !state.model.newRepository;
	},
	toggleCloneRepository(state) {
		state.model.cloneRepository = !state.model.cloneRepository;
	}
};

const actions = {
	showAddLocalRepositoryModel: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		});
		commit({
			type: "toggleAddLocalRepositoryModel"
		});
	},
	showAboutModel: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		});
		commit({
			type: "toggleAboutModel"
		});
	},
	showExportCommitData: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		});
		commit({
			type: "toggleExportCommitData"
		});
	},
	showNewRemote: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		});
		commit({
			type: "toggleNewRemote"
		});
	},
	showNewRepository: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		});
		commit({
			type: "toggleNewRepository"
		});
	},
	showCloneRepository: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		});
		commit({
			type: "toggleCloneRepository"
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

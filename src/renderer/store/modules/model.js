const state = {
	isActive: false,
	model: {
		addLocalRepository: false,
		newRepository: false,
		about: false,
		exportCommitData: false,
	}
}

const getters = {}

const mutations = {
	toggleModelPlaceholder(state) {
		state.isActive = !state.isActive
	},
	toggleAddLocalRepositoryModel(state) {
		state.model.addLocalRepository = !state.model.addLocalRepository
	},
	toggleAboutModel(state) {
		state.model.about = !state.model.about
	},
	toggleExportCommitData(state) {
		state.model.exportCommitData = !state.model.exportCommitData
	},
}

const actions = {
	showAddLocalRepositoryModel: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		})
		commit({
			type: "toggleAddLocalRepositoryModel"
		})
	},
	showAboutModel: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		})
		commit({
			type: "toggleAboutModel"
		})
	},
	showExportCommitData: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		})
		commit({
			type: "toggleExportCommitData"
		})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

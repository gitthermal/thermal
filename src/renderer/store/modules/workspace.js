const state = {
	currentRepository: {
		name: "",
		path: ""
	},
	repositoryList: [],
	model: {
		addLocalRepository: false,
		newRepository: false,
		about: false,
		exportCommitData: false,
	}
}

const getters = {
	listAllRepository: state => state.repositoryList
}

const mutations = {
	workspaceRepository(state, payload) {
		state.currentRepository.name = payload.name
		state.currentRepository.path = payload.path
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
	localRepository(state, payload) {
		let repositoryData = {
			path: payload.path,
			name: payload.name,
			remote: payload.remote
		}
		state.repositoryList.push(repositoryData)
	},
	removeRepository(state, payload) {
		state.repositoryList.splice(payload.index, 1)
	}
}

const actions = {
	updateWorkspaceRepository: ({ commit }, payload) => {
		commit({
			type: "workspaceRepository",
			name: payload.name,
			path: payload.path
		})
	},
	switchWorkspaceRepository: ({ commit }) => {
		commit({
			type: "workspaceRepository",
			name: "",
			path: ""
		})
	},
	addLocalRepositoryToList: ({ commit }, payload) => {
		commit({
			type: "localRepository",
			path: payload.path,
			name: payload.name,
			remote: payload.remote
		})
	},
	removeRepositoryFromList: ({ commit }, payload) => {
		commit({
			type: "removeRepository",
			index: payload.index
		})
	},
	showAddLocalRepositoryModel: ({ commit }) => {
		commit({
			type: "toggleAddLocalRepositoryModel"
		})
	},
	showAboutModel: ({ commit }) => {
		commit({
			type: "toggleAboutModel"
		})
	},
	showExportCommitData: ({ commit }) => {
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

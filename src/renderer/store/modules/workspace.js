const state = {
		id: "",
	currentRepository: {
		name: "",
		path: ""
	},
	repositoryList: [],
	model: {
		addLocalRepository: false,
		newRepository: false
	}
}

const getters = {
	listAllRepository: state => state.repositoryList
}

const mutations = {
	workspaceRepository(state, payload) {
		state.repository.id = payload.id
		state.repository.name = payload.name
		state.repository.path = payload.path
	},
	toggleAddLocalRepositoryModel(state) {
		state.model.addLocalRepository = !state.model.addLocalRepository
	},
	localRepository(state, payload) {
		let repositoryData = {
			path: payload.path,
			name: payload.name
		}
		state.repositoryList.push(repositoryData)
	},
	}
}

const actions = {
	updateWorkspaceRepository: ({ commit }, payload) => {
		commit({
			type: "workspaceRepository",
			id: payload.id,
			name: payload.name,
			path: payload.path
		})
	},
	switchWorkspaceRepository: ({ commit }) => {
		commit({
			type: "workspaceRepository",
			id: "",
			name: "",
			path: ""
		})
	},
	addLocalRepositoryToList: ({ commit }, payload) => {
		commit({
			type: "localRepository",
			path: payload.path,
			name: payload.name
		})
	},
	showAddLocalRepositoryModel: ({ commit }) => {
		commit({
			type: "toggleAddLocalRepositoryModel"
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

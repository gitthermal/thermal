const state = {
	repository: {
		id: "",
		name: "",
		path: ""
	}
}

const getters = {}

const mutations = {
	workspaceRepository(state, payload) {
		state.repository.id = payload.id
		state.repository.name = payload.name
		state.repository.path = payload.path
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

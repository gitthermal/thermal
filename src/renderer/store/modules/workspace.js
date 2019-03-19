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

const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

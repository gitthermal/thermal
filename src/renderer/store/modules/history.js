const state = {
	logs: {},
}

const getters = {
	allLogs: state => state.logs,
}

const mutations = {
	updateLogs(state, payload) {
		state.logs = payload.logs
	}
}

const actions = {
	getRepositoryLogs: ({ commit }, payload) => {
		commit({
			type: "updateLogs",
			logs: payload.logs
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

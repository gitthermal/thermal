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

const actions = {}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

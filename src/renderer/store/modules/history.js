const state = {
	logs: {},
	commitInformation: {
		isActive: false,
		title: "",
		description: "",
		author: {
			name: "",
			email: "",
			date: ""
		},
		meta: {
			commit_hash: "",
			tree_hash: "",
			parent_hash: "",
			refs: ""
		},
		committer: {
			name: "",
			email: "",
			date: ""
		},
		files: {
			changes: "",
			additions: "",
			deletion: "",
			list: []
		}
	}
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

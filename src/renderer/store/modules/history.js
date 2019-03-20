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
	getCommitInformation: state => state.commitInformation
}

const mutations = {
	updateLogs(state, payload) {
		state.logs = payload.logs
	},
	toggleCommitInformation(state) {
		state.commitInformation.isActive = !state.commitInformation.isActive
	}
}

const actions = {
	getRepositoryLogs: ({ commit }, payload) => {
		commit({
			type: "updateLogs",
			logs: payload.logs
		})
	},
	showCommitInformation: ({ commit }) => {
		commit({
			type: "toggleCommitInformation"
		})
	},
	updateCommitInformationAuthor: ({ commit }, payload) => {
		commit({
			type: "updateCommitInformation",
			author_name: payload.author_name,
			author_email: payload.author_email
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

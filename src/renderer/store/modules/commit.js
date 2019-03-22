const state = {
	activeBranch: "",
	staged: []
}

const getters = {
	allStagedFiles: state => state.staged
}

const mutations = {
	activeBranch(state, payload) {
		state.activeBranch = payload.branch
	},
	stagedFiles(state, payload) {
		state.staged = payload.staged
	}
}

const actions = {
	updateActiveBranch: ({ commit }, payload) => {
		commit({
			type: "activeBranch",
			branch: payload.branch
		})
	},
	updateCommitFiles: ({ commit }, payload) => {
		commit({
			type: "modifiedFiles",
			modified: payload.modified
		})
		commit({
			type: "notAddedFiles",
			notAdded: payload.notAdded
		})
		commit({
			type: "deletedFiles",
			deleted: payload.deleted
		})
	},
	updateStagedFiles: ({ commit }, payload) => {
		commit({
			type: "stagedFiles",
			staged: payload.staged
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

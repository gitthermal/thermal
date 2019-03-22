const state = {
	activeBranch: "",
	staged: [],
	files: []
}

const getters = {
	allStagedFiles: state => state.staged,
	allFiles: state => state.files
}

const mutations = {
	activeBranch(state, payload) {
		state.activeBranch = payload.branch
	},
	stagedFiles(state, payload) {
		state.staged = payload.staged
	},
	files(state, payload) {
		state.files = payload.files
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
	},
	updateFiles: ({ commit }, payload) => {
		commit({
			type: "files",
			files: payload.files
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

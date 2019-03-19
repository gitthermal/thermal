const state = {
	repo: []
	model: {
		addLocalRepository: false,
		newRepository: false
	}
}

const getters = {
	allRepo: state => state.repo
}

const mutations = {
	toggleAddLocalRepositoryModel(state) {
		state.model.addLocalRepository = !state.model.addLocalRepository
	},
	localRepository(state, payload) {
		let repoData = {
			path: payload.path,
			name: payload.name
		}
		state.repo.push(repoData)
	}
}

const actions = {
	addLocalRepository: ({ commit }, payload) => {
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

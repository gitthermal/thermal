const state = {
	repo: []
}

const getters = {
	allRepo: state => state.repo
}

const mutations = {
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}

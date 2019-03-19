const state = {
	isActive: false
}

const getters = {}

const mutations = {
	toggleModelPlaceholder(state) {
		state.isActive = !state.isActive
	}
}

const actions = {
	showAddLocalRepositoryModel: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
		})
		commit({
			type: "addRepo/toggleAddLocalRepositoryModel"
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

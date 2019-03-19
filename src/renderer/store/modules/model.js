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
	showModelPlaceholder: ({ commit }) => {
		commit({
			type: "toggleModelPlaceholder"
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

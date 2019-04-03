import workspace from "./workspace"

const state = {
	repositoryList: []
}

const getters = {
	listAllRepository: state => state.repositoryList
}

const mutations = {
	addLocalRepository(state, payload) {
		let repositoryData = {
			path: payload.path,
			name: payload.name,
			remote: payload.remote,
			features: {
				commit: payload.commits,
				remote: payload.remotes
			}
		}
		state.repositoryList.push(repositoryData)
	},	
	removeLocalRepository(state) {
		state.repositoryList.splice(workspace.state.workspaceRepository.index, 1)
	},
	editLocalRepositoryName(state, payload) {
		state.repositoryList[workspace.state.workspaceRepository.index].name = payload.name
	},
	localRepositoryRemote(state, payload) {
		state.repositoryList[workspace.state.workspaceRepository.index].remote = payload.remote
	},
	toggleCommitFeature(state, payload) {
		console.log(state.repositoryList[workspace.state.workspaceRepository.index].features.commit)
		state.repositoryList[workspace.state.workspaceRepository.index].features.commit = payload.commits
	},
	toggleRemoteFeature(state, payload) {
		console.log(state.repositoryList[workspace.state.workspaceRepository.index].features.remote)
		state.repositoryList[workspace.state.workspaceRepository.index].features.remote = payload.remotes
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

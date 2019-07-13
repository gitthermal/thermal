import workspace from "./workspace";

const state = {
	repositoryList: []
};

const getters = {
	listAllRepository: state => state.repositoryList
};

const mutations = {
	getRepositoryList(state) {
		if (localStorage.getItem("repository")) {
			state.repositoryList = JSON.parse(localStorage.getItem("repository"));
		}
	},
	addLocalRepository(state, payload) {
		let repositoryData = {
			path: payload.path,
			name: payload.name,
			remote: payload.remote,
			isGit: payload.isGit,
			features: {
				commit: payload.commits,
				remote: payload.remotes
			}
		};
		state.repositoryList.push(repositoryData);
		localStorage.setItem("repository", JSON.stringify(state.repositoryList));
	},
	removeLocalRepository(state) {
		state.repositoryList.splice(workspace.state.workspaceRepository.index, 1);
		localStorage.setItem("repository", JSON.stringify(state.repositoryList));
	},
	editLocalRepositoryName(state, payload) {
		// eslint-disable-next-line prettier/prettier
		state.repositoryList[workspace.state.workspaceRepository.index].name = payload.name;
	},
	localRepositoryRemote(state, payload) {
		state.repositoryList[workspace.state.workspaceRepository.index].remote =
			payload.remote;
	},
	toggleCommitFeature(state, payload) {
		state.repositoryList[
			workspace.state.workspaceRepository.index
		].features.commit = payload.commits;
	},
	toggleRemoteFeature(state, payload) {
		state.repositoryList[
			workspace.state.workspaceRepository.index
		].features.remote = payload.remotes;
	},
	toggleIsGit(state, payload) {
		state.repositoryList[payload.index].isGit = payload.isGit;
	}
};

const actions = {
	updateIsGit: ({ commit }, payload) => {
		commit({
			type: "toggleIsGit",
			index: payload.index,
			isGit: payload.isGit
		});
		localStorage.setItem("repository", JSON.stringify(state.repositoryList));
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};

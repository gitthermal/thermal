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
	removeLocalRepository(state, payload) {
		state.repositoryList.splice(payload.projectId, 1);
		localStorage.setItem("repository", JSON.stringify(state.repositoryList));
	},
	editLocalRepositoryName(state, payload) {
		state.repositoryList[payload.projectId].name = payload.name;
	},
	localRepositoryRemote(state, payload) {
		state.repositoryList[payload.projectId].remote = payload.remote;
	},
	toggleCommitFeature(state, payload) {
		state.repositoryList[payload.projectId].features.commit = payload.commits;
	},
	toggleRemoteFeature(state, payload) {
		state.repositoryList[payload.projectId].features.remote = payload.remotes;
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

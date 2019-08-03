const state = {
	logs: [],
	commitInformation: {
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
			additions: "",
			deletion: "",
			list: []
		}
	},
	filePreview: {
		isActive: false,
		preview: []
	}
};

const getters = {
	allLogs: state => state.logs,
	getCommitInformation: state => state.commitInformation,
	getFilePreview: state => state.filePreview.preview
};

const mutations = {
	updateLogs(state, payload) {
		state.logs = payload.logs;
	},
	commitInformationCommitHash(state, payload) {
		state.commitInformation.meta.commit_hash = payload.commit_hash;
	},
	commitInformationBody(state, payload) {
		state.commitInformation.title = payload.title;
		state.commitInformation.description = payload.description;
	},
	commitInformationAuthor(state, payload) {
		state.commitInformation.author.name = payload.author_name;
		state.commitInformation.author.email = payload.author_email;
		state.commitInformation.author.date = payload.author_date;
	},
	commitInformationMeta(state, payload) {
		state.commitInformation.meta.tree_hash = payload.tree_hash;
		state.commitInformation.meta.parent_hash = payload.parent_hash;
		state.commitInformation.meta.refs = payload.meta_refs;
	},
	commitInformationCommitter(state, payload) {
		state.commitInformation.committer.name = payload.committer_name;
		state.commitInformation.committer.email = payload.committer_email;
		state.commitInformation.committer.date = payload.committer_date;
	},
	commitInformationFiles(state, payload) {
		state.commitInformation.files.additions = payload.files_additions;
		state.commitInformation.files.deletion = payload.files_deletion;
		state.commitInformation.files.list = payload.files_list;
	},
	toggleFilePreview(state, payload) {
		state.filePreview.isActive = payload.isActive;
	},
	filePreview(state, payload) {
		state.filePreview.preview = payload.preview;
	}
};

const actions = {
	updateCommitInformationBody: ({ commit }, payload) => {
		commit({
			type: "commitInformationBody",
			title: payload.title,
			description: payload.description
		});
	},
	updateCommitInformationAuthor: ({ commit }, payload) => {
		commit({
			type: "commitInformationAuthor",
			author_name: payload.author_name,
			author_email: payload.author_email,
			author_date: payload.author_date
		});
	},
	updateCommitInformationMeta: ({ commit }, payload) => {
		commit({
			type: "commitInformationCommitHash",
			commit_hash: payload.commit_hash
		});
		commit({
			type: "commitInformationMeta",
			tree_hash: payload.tree_hash,
			parent_hash: payload.parent_hash,
			meta_refs: payload.meta_refs
		});
		commit({
			type: "commitInformationCommitter",
			committer_name: payload.committer_name,
			committer_email: payload.committer_email,
			committer_date: payload.committer_date
		});
	},
	updateCommitInformationFiles: ({ commit }, payload) => {
		commit({
			type: "commitInformationFiles",
			files_additions: payload.files_additions,
			files_deletion: payload.files_deletion,
			files_list: payload.files_list
		});
	},
	updateFilePreview: ({ commit }, payload) => {
		commit({
			type: "filePreview",
			preview: payload.preview
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};

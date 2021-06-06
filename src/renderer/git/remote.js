import { Repository, Remote } from "nodegit";

export const getRemoteListNames = async path => {
	try {
		let repository = await Repository.open(path);
		let remoteName = await Remote.list(repository);
		return remoteName;
	} catch (error) {
		console.log(error);
	}
};

export const getRemoteUrl = async (path, remoteName) => {
	try {
		let repository = await Repository.open(path);
		let remoteObject = await repository.getRemote(remoteName);
		let remoteUrl = await remoteObject.url();
		return remoteUrl;
	} catch (error) {
		console.log(error);
	}
};

export const addRemoteUrl = async (path, remoteName, url) => {
	try {
		let repository = await Repository.open(path);
		let result = await Remote.setUrl(repository, remoteName, url);
		return result;
	} catch (error) {
		console.log(error);
	}
};

import { Repository } from "nodegit";

export const fetch = async (path, remoteName) => {
	try {
		const repository = await Repository.open(path);
		const result = await repository.fetch(remoteName);
		return result;
	} catch (error) {
		console.log(error);
	}
};

export const fetchAll = async path => {
	try {
		const repository = await Repository.open(path);
		const result = await repository.fetchAll();
		return result;
	} catch (error) {
		console.log(error);
	}
};

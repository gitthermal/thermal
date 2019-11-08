import { Repository } from "nodegit";
import { getBranchName } from "./branch";

export const pullRemoteBranch = async path => {
	try {
		const repository = await Repository.open(path);
		const branchName = await getBranchName(path);
		const result = await repository.mergeBranches(
			branchName,
			`origin/${branchName}`
		);
		return result;
	} catch (error) {
		console.log(error);
	}
};

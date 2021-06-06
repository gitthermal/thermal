import nodegit from "nodegit";

export const getBranchName = async path => {
	let repository = await nodegit.Repository.open(path);
	let currentBranch = await repository.getCurrentBranch();
	let branchName = await nodegit.Branch.name(currentBranch);
	return branchName;
};

import nodegit from "nodegit";

const log = async (path, count = 50) => {
	const repo = await nodegit.Repository.open(path);

	const newRevWalk = repo.createRevWalk();

	const commit = await repo.getHeadCommit();

	const result = newRevWalk.push(commit.sha());

	if (result !== 0) {
		console.log("Error: " + result);
	} else {
		const commits = await newRevWalk.getCommits(count);

		console.log(commits);

		return commits;
	}
};

export default log;

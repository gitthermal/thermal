import nodegit from "nodegit";

const log = async path => {
	const repo = await nodegit.Repository.open(path);
	const commit = await repo.getHeadCommit();

	// History returns an event.
	const history = commit.history(nodegit.Revwalk.SORT.TIME);

	let logs = [];

	// History emits "commit" event for each commit in the branch's history
	history.on("commit", function(commit) {
		let objectCommit = {
			author_email: commit.author().email(),
			author_name: commit.author().name(),
			body: commit.body(),
			date: commit.date(),
			hash: commit.sha(),
			message: commit.message()
		};

		logs.push(objectCommit);
	});

	history.start();

	return logs;
};

export default log;

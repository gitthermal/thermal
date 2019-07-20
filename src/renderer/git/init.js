import git from "simple-git/promise";

const init = async path => {
	let initializeRepository = git(path);
	await initializeRepository.init();
};

export default init;

import git from "simple-git/promise";

const init = async path => {
	let initaliseRepository = git(path);
	await initaliseRepository.init();
};

export default init;

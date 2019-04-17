import git from "simple-git/promise";

const init = async (repository) => {
	let initaliseRepository = git(repository);
	await initaliseRepository.init();
};

export default init;

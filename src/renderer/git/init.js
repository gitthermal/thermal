import git from "simple-git/promise";
import gitCommand from "../mixins/commands";

const init = async path => {
	let initaliseRepository = git(path);
	gitCommand("init");
	await initaliseRepository.init();
};

export default init;

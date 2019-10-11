import nodegit from "nodegit";

const init = repo => {
	nodegit.Repository.init(repo.path, 0)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export default init;

import nodegit from "nodegit";

const status = repository => {
	nodegit.Repository.open(repository.path)
		.then(repo => {
			repo
				.getStatus()
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		})
		.catch(err => {
			console.log(err);
		});
};

export default status;

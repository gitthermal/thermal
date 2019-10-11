import nodegit from "nodegit";

const init = async path => {
	nodegit.Repository.init(path, 0)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});
};

export default init;

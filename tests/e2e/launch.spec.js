import utils from "./utils";

describe("lunch", () => {
	beforeEach(utils.beforeEach);
	afterEach(utils.afterEach);

	it("should show application title", () => {
		return this.app.client.getTitle().then(title => {
			expect(title).to.equal("Thermal");
		});
	});
});

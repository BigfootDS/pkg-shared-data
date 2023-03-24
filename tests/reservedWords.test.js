const { WordBlacklists } = require("../src");


describe("Developer reserved words contain the company name.", () => {
	test("BigfootDS is a reserved word", () => {
		expect(WordBlacklists.DeveloperReserved.includes("BigfootDS"));
		expect(WordBlacklists.DeveloperReserved.includes("bigfootds"));
	});
})
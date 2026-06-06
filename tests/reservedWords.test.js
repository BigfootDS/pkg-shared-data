const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const { WordBlacklists } = require("../src");


describe("Developer reserved words contain the company name.", () => {
	test("bigfootds is a reserved word", () => {
		assert.ok(WordBlacklists.DeveloperReserved.includes("bigfootds"));
	});
})

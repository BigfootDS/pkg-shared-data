const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const { WordBlacklists } = require("@bigfootds/bigfootds-shared-data");
const httpStatusCodes = require("@bigfootds/bigfootds-shared-data/src/data/httpStatusCodes");
const { DataRetrievalFailure } = require("@bigfootds/bigfootds-shared-data/data/errors/DataErrors");


describe("Developer reserved words contain the company name.", () => {
	test("bigfootds is a reserved word", () => {
		assert.ok(WordBlacklists.DeveloperReserved.includes("bigfootds"));
	});

	test("compiled deep imports remain available", () => {
		assert.equal(httpStatusCodes.clientError.NOT_FOUND, 404);
		assert.equal(new DataRetrievalFailure().httpStatus, 404);
	});
})

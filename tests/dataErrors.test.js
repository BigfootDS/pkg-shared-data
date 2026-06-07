const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const bdsSharedData = require("@bigfootds/bigfootds-shared-data");
const httpStatusCodes = require("@bigfootds/bigfootds-shared-data/src/data/httpStatusCodes");
const {
	ActionProhibited,
	BigfootDSError,
	DataConflictFailure,
	DataCreationFailure,
	DataRetrievalFailure,
	DataUpdateFailure,
	DataValidationDatabaseFailure,
	DataValidationRequestFailure,
	JWTExpired,
	WrongTokenType,
	dataErrorDefinitions
} = require("@bigfootds/bigfootds-shared-data/data/errors/DataErrors");

describe("Data error exports", () => {
	test("compiled deep imports remain available", () => {
		assert.equal(httpStatusCodes.clientError.NOT_FOUND, 404);
		assert.equal(new DataRetrievalFailure().httpStatus, 404);
	});

	test("root exports expose error classes and grouped status codes", () => {
		assert.equal(bdsSharedData.DataErrors.DataConflictFailure, DataConflictFailure);
		assert.equal(
			bdsSharedData.HttpStatusCodes.clientError.CONFLICT,
			httpStatusCodes.clientError.CONFLICT
		);
	});
});

describe("Data error classes", () => {
	test("API errors use shared HTTP status code data", () => {
		assert.equal(new DataValidationRequestFailure().httpStatus, httpStatusCodes.clientError.BAD_REQUEST);
		assert.equal(
			new DataValidationDatabaseFailure().httpStatus,
			httpStatusCodes.clientError.UNPROCESSABLE_ENTITY
		);
		assert.equal(new DataRetrievalFailure().httpStatus, httpStatusCodes.clientError.NOT_FOUND);
		assert.equal(new DataConflictFailure().httpStatus, httpStatusCodes.clientError.CONFLICT);
		assert.equal(
			new DataCreationFailure().httpStatus,
			httpStatusCodes.serverError.INTERNAL_SERVER_ERROR
		);
		assert.equal(new ActionProhibited().httpStatus, httpStatusCodes.clientError.FORBIDDEN);
		assert.equal(new JWTExpired().httpStatus, httpStatusCodes.clientError.UNAUTHORIZED);
		assert.equal(new WrongTokenType().httpStatus, httpStatusCodes.clientError.UNPROCESSABLE_ENTITY);
	});

	test("API errors support message strings and structured options", () => {
		const cause = new Error("database driver failure");
		const error = new DataUpdateFailure({
			cause,
			details: { id: "record-1" },
			message: "Profile update failed."
		});

		assert.ok(error instanceof Error);
		assert.ok(error instanceof BigfootDSError);
		assert.equal(error.name, "DataUpdateFailure");
		assert.equal(error.message, "Profile update failed.");
		assert.equal(error.bdsCode, dataErrorDefinitions.DataUpdateFailure.bdsCode);
		assert.equal(error.cause, cause);
		assert.deepEqual(error.toJSON(), {
			bdsCode: dataErrorDefinitions.DataUpdateFailure.bdsCode,
			category: "database",
			details: { id: "record-1" },
			httpStatus: httpStatusCodes.serverError.INTERNAL_SERVER_ERROR,
			message: "Profile update failed.",
			name: "DataUpdateFailure"
		});

		assert.equal(new DataRetrievalFailure("Custom not found.").message, "Custom not found.");
	});
});

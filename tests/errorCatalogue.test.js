const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const bdsSharedData = require("@bigfootds/bigfootds-shared-data");
const errorCatalogue = require("@bigfootds/bigfootds-shared-data/data/errors/errorCatalogue");

describe("Global error catalogue exports", () => {
	test("root and deep imports expose the same global error catalogue", () => {
		assert.equal(bdsSharedData.ERROR_CODES.VALIDATION_FAILED, "validation_failed");
		assert.equal(errorCatalogue.ERROR_CODES.AUTH_USER_BANNED, "auth_user_banned");
		assert.equal(bdsSharedData.GLOBAL_ERROR_CATALOGUE, errorCatalogue.GLOBAL_ERROR_CATALOGUE);
		assert.equal(
			bdsSharedData.ErrorCatalogue.GLOBAL_ERROR_CATALOGUE_BY_CODE.rate_limited.defaultHttpStatus,
			429
		);
	});

	test("catalogue codes are flat snake_case values and globally unique", () => {
		const codes = errorCatalogue.GLOBAL_ERROR_CATALOGUE.map((definition) => definition.code);
		assert.equal(new Set(codes).size, codes.length);

		for (const code of codes) {
			assert.match(code, /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/);
			assert.doesNotMatch(code, /[./-]/);
		}
	});

	test("catalogue entries use the first-pass metadata shape", () => {
		for (const definition of errorCatalogue.GLOBAL_ERROR_CATALOGUE) {
			assert.deepEqual(Object.keys(definition).sort(), [
				"code",
				"defaultHttpStatus",
				"defaultMessage",
				"ownerArea"
			]);
			assert.equal(typeof definition.defaultMessage, "string");
			assert.ok(definition.defaultMessage.length > 0);
		}
	});

	test("planned first-pass error definitions are present", () => {
		assert.deepEqual(errorCatalogue.GLOBAL_ERROR_CATALOGUE_BY_CODE.auth_user_banned, {
			code: "auth_user_banned",
			ownerArea: "ms-auth",
			defaultHttpStatus: 403,
			defaultMessage: "This account cannot be used."
		});

		assert.deepEqual(errorCatalogue.GLOBAL_ERROR_CATALOGUE_BY_CODE.friend_request_unavailable, {
			code: "friend_request_unavailable",
			ownerArea: "ms-userrelations",
			defaultHttpStatus: 403,
			defaultMessage: "You cannot send a friend request to this user."
		});

		assert.deepEqual(errorCatalogue.GLOBAL_ERROR_CATALOGUE_BY_CODE.provider_event_unknown_sku, {
			code: "provider_event_unknown_sku",
			ownerArea: "ms-ecommerce",
			defaultHttpStatus: 422,
			defaultMessage: "The provider event references an unknown product."
		});
	});

	test("lookup helpers distinguish known and unknown error codes", () => {
		assert.equal(errorCatalogue.isKnownErrorCode("rate_limited"), true);
		assert.equal(errorCatalogue.isKnownErrorCode("BDS-RLE-01"), false);
		assert.equal(errorCatalogue.getErrorCodeDefinition("BDS-RLE-01"), undefined);
		assert.equal(errorCatalogue.getErrorCodeDefinition("internal_error").defaultHttpStatus, 500);
	});
});

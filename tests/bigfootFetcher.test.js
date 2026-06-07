const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const bdsSharedData = require("@bigfootds/bigfootds-shared-data");
const bigfootFetcherData = require("@bigfootds/bigfootds-shared-data/data/bigfootFetcher");

const expectedHeaderNames = [
	"productName",
	"productVersion",
	"browserName",
	"browserVersion",
	"browserEngineName",
	"browserEngineVersion",
	"osName",
	"osVersion",
	"osVersionName",
	"platformType",
	"platformName"
];

describe("Bigfoot Fetcher data exports", () => {
	test("root and deep imports expose the fetcher header names", () => {
		assert.deepEqual(bigfootFetcherData.BIGFOOT_FETCHER_HEADER_NAMES, expectedHeaderNames);
		assert.deepEqual(bdsSharedData.BIGFOOT_FETCHER_HEADER_NAMES, expectedHeaderNames);
		assert.equal(
			bdsSharedData.BigfootFetcherData.BIGFOOT_FETCHER_HEADER_NAMES,
			bigfootFetcherData.BIGFOOT_FETCHER_HEADER_NAMES
		);
	});

	test("environment key groups preserve fetcher's lookup order", () => {
		assert.deepEqual(bigfootFetcherData.BIGFOOT_FETCHER_PLATFORM_TYPE_ENV_KEYS, [
			"npm_package_config_bigfootds_platformType",
			"npm_package_platformType",
			"platformType",
			"PLATFORMTYPE",
			"PLATFORM_TYPE",
			"REACT_APP_PLATFORM_TYPE",
			"REACT_APP_PLATFORMTYPE",
			"VITE_PLATFORM_TYPE",
			"VITE_PLATFORMTYPE"
		]);

		assert.equal(
			bigfootFetcherData.BIGFOOT_FETCHER_ENV_KEYS.productVersion.at(-1),
			"npm_package_version"
		);
	});

	test("Node platform names are available for fetcher runtime metadata", () => {
		assert.equal(bigfootFetcherData.BIGFOOT_FETCHER_NODE_OS_NAMES.win32, "Windows_NT");
		assert.equal(bigfootFetcherData.BIGFOOT_FETCHER_NODE_OS_NAMES.linux, "Linux");
	});
});

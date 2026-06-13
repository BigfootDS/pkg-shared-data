const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const {
	PROFANITY_LISTS,
	PROFANITY_LISTS_BY_ID,
	PROFANITY_LIST_IDS,
	WordBlacklists,
	devWordsArray,
	reservedWordsArray
} = require("@bigfootds/bigfootds-shared-data");

describe("Profanity data exports", () => {
	test("bigfootds is a reserved developer word", () => {
		assert.ok(WordBlacklists.DeveloperReserved.includes("bigfootds"));
		assert.ok(devWordsArray.includes("bigfootds"));
	});

	test("reserved words are exported separately from developer words", () => {
		assert.ok(WordBlacklists.ReservedWords.includes("admin"));
		assert.ok(reservedWordsArray.includes("admin"));
	});

	test("profanity list metadata is exported with the baseline word lists", () => {
		assert.deepEqual(
			PROFANITY_LISTS.map((list) => list.id),
			[PROFANITY_LIST_IDS.DEV_WORDS, PROFANITY_LIST_IDS.RESERVED_WORDS]
		);
		assert.equal(PROFANITY_LISTS_BY_ID.dev_words.words, devWordsArray);
		assert.equal(PROFANITY_LISTS_BY_ID.reserved_words.words, reservedWordsArray);
		assert.equal(PROFANITY_LISTS_BY_ID.dev_words.matchingDefault, "substring_for_names");
	});

	test("runtime profanity manager exports are not part of shared data", () => {
		assert.equal("chatProfanityHandler" in require("@bigfootds/bigfootds-shared-data"), false);
		assert.equal("playerNameProfanityHandler" in require("@bigfootds/bigfootds-shared-data"), false);
	});
});

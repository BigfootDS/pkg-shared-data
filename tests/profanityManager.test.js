const assert = require("node:assert/strict");
const { describe, test } = require("node:test");
const {
	PROFANITY_LISTS,
	PROFANITY_LISTS_BY_ID,
	PROFANITY_LIST_IDS,
	ProfanityHandlers,
	WordBlacklists,
	chatProfanityHandler,
	devWordsArray,
	getSupportedProfanityLanguageForLocale,
	playerNameProfanityHandler,
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
});

describe("Profanity handlers", () => {
	test("chat handler detects profanity without treating developer words as profanity", () => {
		assert.equal(chatProfanityHandler.exists("I like big butts and I cannot lie"), true);
		assert.equal(chatProfanityHandler.exists("bigfootds staff update"), false);
		assert.equal(ProfanityHandlers.chat.exists("bigfootds staff update"), false);
	});

	test("player name handler blocks profanity, reserved words, and developer words", () => {
		const profanityResult = playerNameProfanityHandler.check("bigbutts");
		const reservedResult = playerNameProfanityHandler.check("admin");
		const devResult = ProfanityHandlers.playerName.check("BigfootDS");

		assert.equal(profanityResult.hasProfanity, true);
		assert.equal(profanityResult.isAllowed, false);
		assert.equal(reservedResult.hasReservedWord, true);
		assert.equal(reservedResult.isAllowed, false);
		assert.equal(devResult.hasDevWord, true);
		assert.equal(devResult.isAllowed, false);
	});

	test("target locales can resolve to supported profanity languages", () => {
		assert.equal(getSupportedProfanityLanguageForLocale("pt-BR"), "pt");
		assert.equal(getSupportedProfanityLanguageForLocale("nl"), undefined);
	});
});

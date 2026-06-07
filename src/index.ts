import { devWordsArray, reservedWordsArray } from "./data/profanityList";

export * from "./data/errors/DataErrors";
export * as DataErrors from "./data/errors/DataErrors";
export * from "./data/bigfootFetcher";
export * as BigfootFetcherData from "./data/bigfootFetcher";
export * as HttpStatusCodes from "./data/httpStatusCodes";
export { devWordsArray, reservedWordsArray } from "./data/profanityList";
export {
	CensorType,
	Profanity,
	ProfanityHandlers,
	ProfanityOptions,
	chatProfanityHandler,
	defaultProfanityLanguages,
	findRestrictedWords,
	getSupportedProfanityLanguageForLocale,
	isSupportedProfanityLanguage,
	normalizeRestrictedWord,
	playerNameProfanityHandler,
	profaneWords,
	profanity,
	supportedProfanityLanguages,
	targetProfanityLanguages
} from "./profanityManager";

export type {
	ChatCensorOptions,
	PlayerNameCheckOptions,
	PlayerNameCheckResult,
	ProfanityLanguageOptions,
	SupportedProfanityLanguage,
	TargetProfanityLanguage
} from "./profanityManager";

/**
 * Backwards-compatible grouped word lists exposed by the package root.
 *
 * New code should prefer `WordLists`, `devWordsArray`, or `reservedWordsArray`
 * when it needs direct access to these datasets.
 */
export interface WordBlacklists {
	/**
	 * Words reserved for BigfootDS staff or official platform usage.
	 */
	DeveloperReserved: string[];

	/**
	 * Platform words that should not be available as public user-controlled names.
	 */
	ReservedWords: string[];
}

/**
 * Backwards-compatible word-list object retained for older consumers.
 *
 * It no longer contains a profanity array; profanity detection is handled by
 * `chatProfanityHandler` and `playerNameProfanityHandler`.
 */
export const WordBlacklists: WordBlacklists = {
	DeveloperReserved: devWordsArray,
	ReservedWords: reservedWordsArray
};

/**
 * Preferred grouped export for BigfootDS-owned word lists.
 */
export const WordLists = {
	DevWords: devWordsArray,
	ReservedWords: reservedWordsArray
};

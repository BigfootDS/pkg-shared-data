import { devWordsArray, reservedWordsArray } from "./data/profanityList";

export * from "./data/projects";
export * from "./data/errors/DataErrors";
export * from "./data/errors/errorCatalogue";
export * as DataErrors from "./data/errors/DataErrors";
export * as ErrorCatalogue from "./data/errors/errorCatalogue";
export * from "./data/bigfootFetcher";
export * as BigfootFetcherData from "./data/bigfootFetcher";
export * as HttpStatusCodes from "./data/httpStatusCodes";
export * from "./data/profanityList";

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
 * It no longer contains a profanity array; runtime profanity detection is handled by
 * `@bigfootds/bigfootds-service-utils`.
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

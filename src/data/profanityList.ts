/**
 * BigfootDS-specific words reserved for staff, official services, or developer-only usage.
 *
 * These words should be blocked in player/user names, but they should not be treated as
 * profane in normal chat messages.
 */
export const devWordsArray: string[] = [
	"bigfootds",
	"bigfoot",
	"bds",
	"developer",
	"staff"
];

/**
 * Platform-level words that should not be available as public user-controlled names.
 *
 * These words are not profanity; they are reserved for account safety, moderation clarity,
 * and platform/system identity.
 */
export const reservedWordsArray: string[] = [
	"admin",
	"administrator",
	"moderator",
	"mod",
	"support",
	"system",
	"official",
	"owner",
	"root",
	"null",
	"undefined"
];

/**
 * Canonical IDs for BigfootDS-owned restricted word lists.
 */
export const PROFANITY_LIST_IDS = {
	DEV_WORDS: "dev_words",
	RESERVED_WORDS: "reserved_words"
} as const;

/**
 * Type-safe union of canonical BigfootDS profanity/restricted-word list IDs.
 */
export type ProfanityListId = typeof PROFANITY_LIST_IDS[keyof typeof PROFANITY_LIST_IDS];

/**
 * Broad intent for a BigfootDS profanity/restricted-word list.
 */
export type ProfanityListKind = "developer_reserved" | "platform_reserved";

/**
 * Matching posture consumers normally apply to a list.
 *
 * This is metadata only. Matching, normalisation, scoring, and enforcement stay
 * in consuming services or later runtime utility packages.
 */
export type ProfanityListMatchingDefault = "substring_for_names" | "consumer_defined";

/**
 * Static metadata and words for a BigfootDS-owned profanity/restricted-word list.
 */
export interface ProfanityListDefinition {
	/**
	 * Canonical list ID.
	 */
	readonly id: ProfanityListId;

	/**
	 * Human-readable list name.
	 */
	readonly displayName: string;

	/**
	 * Broad list intent.
	 */
	readonly kind: ProfanityListKind;

	/**
	 * BCP 47 language tag when a list is language-specific.
	 *
	 * `undefined` means the list is platform-scoped rather than language-scoped.
	 */
	readonly locale?: string;

	/**
	 * Reviewable description of what the list is for.
	 */
	readonly description: string;

	/**
	 * Default consumer posture for matching this list.
	 */
	readonly matchingDefault: ProfanityListMatchingDefault;

	/**
	 * Static list data.
	 */
	readonly words: readonly string[];
}

/**
 * Stable ordered BigfootDS-owned profanity/restricted-word lists.
 */
export const PROFANITY_LISTS = [
	{
		id: PROFANITY_LIST_IDS.DEV_WORDS,
		displayName: "Developer reserved words",
		kind: "developer_reserved",
		description: "Words reserved for BigfootDS staff, official services, or developer-only usage.",
		matchingDefault: "substring_for_names",
		words: devWordsArray
	},
	{
		id: PROFANITY_LIST_IDS.RESERVED_WORDS,
		displayName: "Platform reserved words",
		kind: "platform_reserved",
		description: "Words reserved for account safety, moderation clarity, and platform/system identity.",
		matchingDefault: "substring_for_names",
		words: reservedWordsArray
	}
] as const satisfies readonly ProfanityListDefinition[];

function buildProfanityListMap(
	lists: readonly ProfanityListDefinition[]
): Readonly<Record<ProfanityListId, ProfanityListDefinition>> {
	const entries = lists.map((list) => [list.id, list] as const);
	return Object.freeze(Object.fromEntries(entries)) as Readonly<Record<ProfanityListId, ProfanityListDefinition>>;
}

/**
 * Read-only lookup map keyed by profanity/restricted-word list ID.
 */
export const PROFANITY_LISTS_BY_ID = buildProfanityListMap(PROFANITY_LISTS);

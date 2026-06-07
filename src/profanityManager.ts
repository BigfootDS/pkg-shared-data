import { CensorType, Profanity, type ProfanityOptions } from "@2toad/profanity";
import { devWordsArray, reservedWordsArray } from "./data/profanityList";

export { CensorType, Profanity, ProfanityOptions, profaneWords, profanity } from "@2toad/profanity";

/**
 * Language codes that `@2toad/profanity` supports without BigfootDS custom datasets.
 *
 * Do not add BigfootDS-only custom dataset codes here; use separate custom
 * dataset metadata so upstream support and first-party support remain distinct.
 */
export const supportedProfanityLanguages = [
	"ar",
	"zh",
	"en",
	"fr",
	"de",
	"hi",
	"it",
	"ja",
	"ko",
	"pt",
	"ru",
	"es"
] as const;

/**
 * Union of language codes supported directly by the upstream profanity package.
 */
export type SupportedProfanityLanguage = typeof supportedProfanityLanguages[number];

/**
 * Metadata for a BigfootDS localisation target and its profanity support status.
 */
export interface TargetProfanityLanguage {
	/**
	 * Human-readable language name used in product and documentation planning.
	 */
	name: string;

	/**
	 * Locale code used by BigfootDS localisation systems.
	 */
	locale: string;

	/**
	 * Upstream profanity language used for this locale, when one is available.
	 */
	profanityLanguage?: SupportedProfanityLanguage;

	/**
	 * Whether profanity detection works with the upstream package without a custom dataset.
	 */
	supportedByDefault: boolean;
}

/**
 * BigfootDS localisation targets and their current profanity-detection coverage.
 */
export const targetProfanityLanguages: readonly TargetProfanityLanguage[] = [
	{ name: "English", locale: "en", profanityLanguage: "en", supportedByDefault: true },
	{ name: "French", locale: "fr", profanityLanguage: "fr", supportedByDefault: true },
	{ name: "Italian", locale: "it", profanityLanguage: "it", supportedByDefault: true },
	{ name: "German", locale: "de", profanityLanguage: "de", supportedByDefault: true },
	{ name: "Spanish", locale: "es", profanityLanguage: "es", supportedByDefault: true },
	{ name: "Portuguese", locale: "pt", profanityLanguage: "pt", supportedByDefault: true },
	{ name: "Portuguese Brazilian", locale: "pt-BR", profanityLanguage: "pt", supportedByDefault: true },
	{ name: "Dutch", locale: "nl", supportedByDefault: false },
	{ name: "Turkish", locale: "tr", supportedByDefault: false },
	{ name: "Japanese", locale: "ja", profanityLanguage: "ja", supportedByDefault: true },
	{ name: "Korean", locale: "ko", profanityLanguage: "ko", supportedByDefault: true },
	{ name: "Mandarin Chinese", locale: "zh", profanityLanguage: "zh", supportedByDefault: true },
	{ name: "Russian", locale: "ru", profanityLanguage: "ru", supportedByDefault: true },
	{ name: "Ukrainian", locale: "uk", supportedByDefault: false },
	{ name: "Malay", locale: "ms", supportedByDefault: false },
	{ name: "Indonesian", locale: "id", supportedByDefault: false },
	{ name: "Vietnamese", locale: "vi", supportedByDefault: false },
	{ name: "Tagalog", locale: "tl", supportedByDefault: false },
	{ name: "Hindi", locale: "hi", profanityLanguage: "hi", supportedByDefault: true },
	{ name: "Urdu", locale: "ur", supportedByDefault: false },
	{ name: "Bengali", locale: "bn", supportedByDefault: false },
	{ name: "Marathi", locale: "mr", supportedByDefault: false },
	{ name: "Telugu", locale: "te", supportedByDefault: false },
	{ name: "Tamil", locale: "ta", supportedByDefault: false },
	{ name: "Arabic", locale: "ar", profanityLanguage: "ar", supportedByDefault: true }
];

/**
 * Default profanity language set used when callers do not provide a language option.
 */
export const defaultProfanityLanguages: readonly SupportedProfanityLanguage[] = ["en"];

/**
 * Shared language options accepted by the exported profanity handlers.
 */
export interface ProfanityLanguageOptions {
	/**
	 * Upstream-supported language codes to use for this check.
	 */
	languages?: readonly SupportedProfanityLanguage[];
}

/**
 * Options for censoring chat text.
 */
export interface ChatCensorOptions extends ProfanityLanguageOptions {
	/**
	 * Replacement strategy used by `@2toad/profanity` when censoring matched words.
	 */
	censorType?: CensorType;
}

/**
 * Options for checking player-facing names.
 */
export interface PlayerNameCheckOptions extends ProfanityLanguageOptions {
	/**
	 * Whether platform-reserved words such as `admin` and `support` should block the name.
	 */
	includeReservedWords?: boolean;

	/**
	 * Whether BigfootDS staff/developer words should block the name.
	 */
	includeDevWords?: boolean;
}

/**
 * Detailed outcome from checking a player/user-controlled name.
 */
export interface PlayerNameCheckResult {
	/**
	 * True only when no profanity, reserved words, or developer words were found.
	 */
	isAllowed: boolean;

	/**
	 * Whether the upstream profanity matcher found profanity in the value.
	 */
	hasProfanity: boolean;

	/**
	 * Whether a platform-reserved word was found in the value.
	 */
	hasReservedWord: boolean;

	/**
	 * Whether a BigfootDS developer-only word was found in the value.
	 */
	hasDevWord: boolean;

	/**
	 * Reserved and developer-word matches found by the BigfootDS word-list checks.
	 */
	matches: {
		reservedWords: string[];
		devWords: string[];
	};
}

/**
 * Profanity instance for free-text chat surfaces.
 *
 * Chat checks use whole-word matching so words such as `arsenic` are less likely
 * to be blocked by a shorter profane substring.
 */
const chatProfanity = new Profanity({
	languages: [...defaultProfanityLanguages],
	wholeWord: true,
	unicodeWordBoundaries: true
});

/**
 * Profanity instance for player/user names.
 *
 * Names use partial matching because hostile names often hide profanity inside
 * longer handles or compound identifiers.
 */
const playerNameProfanity = new Profanity({
	languages: [...defaultProfanityLanguages],
	wholeWord: false,
	unicodeWordBoundaries: true
});

/**
 * Converts readonly public language options into the mutable array expected by `@2toad/profanity`.
 */
function resolveLanguages(languages?: readonly SupportedProfanityLanguage[]): string[] | undefined {
	return languages ? [...languages] : undefined;
}

/**
 * Checks whether a string is a language code supported directly by `@2toad/profanity`.
 */
export function isSupportedProfanityLanguage(language: string): language is SupportedProfanityLanguage {
	return supportedProfanityLanguages.includes(language as SupportedProfanityLanguage);
}

/**
 * Resolves an application locale to an upstream profanity language when one is available.
 *
 * Regional variants such as `pt-BR` can map to a broader upstream language such as `pt`.
 * Returns `undefined` for target locales that need BigfootDS custom datasets.
 */
export function getSupportedProfanityLanguageForLocale(
	locale: string
): SupportedProfanityLanguage | undefined {
	const normalizedLocale = locale.trim().toLowerCase();
	const exactMatch = targetProfanityLanguages.find(
		(language) => language.locale.toLowerCase() === normalizedLocale
	);

	if (exactMatch) {
		return exactMatch.profanityLanguage;
	}

	const baseLocale = normalizedLocale.split("-")[0];

	if (isSupportedProfanityLanguage(baseLocale)) {
		return baseLocale;
	}

	return undefined;
}

/**
 * Normalises a value before comparing it with BigfootDS reserved or developer word lists.
 */
export function normalizeRestrictedWord(value: string): string {
	return value.normalize("NFKC").trim().toLowerCase();
}

/**
 * Finds BigfootDS restricted words contained within a candidate value.
 *
 * This is substring-based by design for player/user names, where users may try
 * to hide restricted terms inside longer handles.
 */
export function findRestrictedWords(value: string, words: readonly string[]): string[] {
	const normalizedValue = normalizeRestrictedWord(value);

	if (!normalizedValue) {
		return [];
	}

	return words.filter((word) => {
		const normalizedWord = normalizeRestrictedWord(word);
		return normalizedWord.length > 0 && normalizedValue.includes(normalizedWord);
	});
}

/**
 * Profanity-only handler for chat and other free-text surfaces.
 *
 * This handler intentionally does not apply BigfootDS reserved or developer word
 * lists, because those terms may be legitimate content in normal messages.
 */
export const chatProfanityHandler = {
	/**
	 * Returns whether the text contains profanity for the requested language set.
	 */
	exists(text: string, options: ProfanityLanguageOptions = {}): boolean {
		return chatProfanity.exists(text, resolveLanguages(options.languages));
	},

	/**
	 * Returns a censored copy of the text without mutating the original input.
	 */
	censor(text: string, options: ChatCensorOptions = {}): string {
		return chatProfanity.censor(
			text,
			options.censorType ?? CensorType.Word,
			resolveLanguages(options.languages)
		);
	}
};

/**
 * Handler for player/user-controlled names.
 *
 * In addition to upstream profanity detection, this checks BigfootDS reserved
 * and developer-only word lists.
 */
export const playerNameProfanityHandler = {
	/**
	 * Checks whether a player/user name is allowed and reports which rule groups matched.
	 */
	check(value: string, options: PlayerNameCheckOptions = {}): PlayerNameCheckResult {
		const hasProfanity = playerNameProfanity.exists(value, resolveLanguages(options.languages));
		const reservedWords = options.includeReservedWords === false
			? []
			: findRestrictedWords(value, reservedWordsArray);
		const devWords = options.includeDevWords === false
			? []
			: findRestrictedWords(value, devWordsArray);

		return {
			isAllowed: !hasProfanity && reservedWords.length === 0 && devWords.length === 0,
			hasProfanity,
			hasReservedWord: reservedWords.length > 0,
			hasDevWord: devWords.length > 0,
			matches: {
				reservedWords,
				devWords
			}
		};
	},

	/**
	 * Convenience wrapper for callers that only need a pass/fail result.
	 */
	isAllowed(value: string, options: PlayerNameCheckOptions = {}): boolean {
		return playerNameProfanityHandler.check(value, options).isAllowed;
	}
};

/**
 * Grouped handlers for consumers that prefer context-based property access.
 */
export const ProfanityHandlers = {
	chat: chatProfanityHandler,
	playerName: playerNameProfanityHandler
};

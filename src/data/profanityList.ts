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

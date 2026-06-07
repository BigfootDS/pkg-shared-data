# Profanity Manager

The profanity manager provides context-specific text checks for BigfootDS projects.

It wraps `@2toad/profanity` for profanity detection, while keeping BigfootDS-specific reserved and developer-only words in this package.

## Targeted Languages

These are the localisation targets used by other BigfootDS projects:

- English
- French
- Italian
- German
- Spanish
- Portuguese
- Portuguese Brazilian
- Dutch
- Turkish
- Japanese
- Korean
- Mandarin Chinese
- Russian
- Ukrainian
- Malay
- Indonesian
- Vietnamese
- Tagalog
- Hindi
- Urdu
- Bengali
- Marathi
- Telugu
- Tamil
- Arabic

## Default Language Support

`@2toad/profanity` currently supports these language codes directly:

```ts
["ar", "zh", "en", "fr", "de", "hi", "it", "ja", "ko", "pt", "ru", "es"]
```

The exported `supportedProfanityLanguages` value mirrors that list.

Languages from the BigfootDS target list that are not supported by default need custom datasets before they can be used for profanity detection.

Currently unsupported target locales include:

- `nl` - Dutch
- `tr` - Turkish
- `uk` - Ukrainian
- `ms` - Malay
- `id` - Indonesian
- `vi` - Vietnamese
- `tl` - Tagalog
- `ur` - Urdu
- `bn` - Bengali
- `mr` - Marathi
- `te` - Telugu
- `ta` - Tamil

## Public Exports

The package root exports the profanity manager API:

```ts
import {
	CensorType,
	Profanity,
	ProfanityHandlers,
	chatProfanityHandler,
	devWordsArray,
	findRestrictedWords,
	getSupportedProfanityLanguageForLocale,
	isSupportedProfanityLanguage,
	normalizeRestrictedWord,
	playerNameProfanityHandler,
	profaneWords,
	profanity,
	reservedWordsArray,
	supportedProfanityLanguages,
	targetProfanityLanguages
} from "@bigfootds/bigfootds-shared-data";
```

The same manager can also be imported from the subpath:

```ts
import {
	chatProfanityHandler,
	playerNameProfanityHandler
} from "@bigfootds/bigfootds-shared-data/profanityManager";
```

## Handler Contexts

Use different handlers for different product surfaces.

### Chat Messages

Chat message checks should only detect or censor profanity.

Developer words such as `bigfootds`, `developer`, or `staff` should not be blocked in normal chat messages.

```ts
import {
	CensorType,
	chatProfanityHandler
} from "@bigfootds/bigfootds-shared-data";

const hasProfanity = chatProfanityHandler.exists("I like big butts and I cannot lie");
const censored = chatProfanityHandler.censor("I like big butts and I cannot lie", {
	censorType: CensorType.Word
});
```

`chatProfanityHandler.exists()` accepts optional language codes:

```ts
const hasFrenchProfanity = chatProfanityHandler.exists("Je suis un connard", {
	languages: ["fr"]
});
```

Use this handler for:

- Chat messages
- Forum posts
- User-generated descriptions
- Any free-text surface where reserved BigfootDS words are allowed

### Player/User Names

Player and user name checks should reject:

- Profanity detected by `@2toad/profanity`
- BigfootDS developer-only words
- Reserved platform words

```ts
import { playerNameProfanityHandler } from "@bigfootds/bigfootds-shared-data";

const result = playerNameProfanityHandler.check("BigfootDS_Admin");

if (!result.isAllowed) {
	console.log(result.hasProfanity);
	console.log(result.hasReservedWord);
	console.log(result.hasDevWord);
	console.log(result.matches);
}
```

The result shape is:

```ts
interface PlayerNameCheckResult {
	isAllowed: boolean;
	hasProfanity: boolean;
	hasReservedWord: boolean;
	hasDevWord: boolean;
	matches: {
		reservedWords: string[];
		devWords: string[];
	};
}
```

For a simple boolean check:

```ts
const isAllowed = playerNameProfanityHandler.isAllowed("new-player-name");
```

Reserved or developer-word checks can be disabled for specialised flows:

```ts
const result = playerNameProfanityHandler.check("staff", {
	includeDevWords: false,
	includeReservedWords: true
});
```

Use this handler for:

- Player names
- Usernames
- Display names
- Guild, party, clan, or team names
- Public account identifiers

## Language Helpers

Use `getSupportedProfanityLanguageForLocale()` when converting application locales into `@2toad/profanity` language codes.

```ts
import { getSupportedProfanityLanguageForLocale } from "@bigfootds/bigfootds-shared-data";

getSupportedProfanityLanguageForLocale("pt-BR");
// "pt"

getSupportedProfanityLanguageForLocale("nl");
// undefined until a Dutch dataset is added
```

Use `isSupportedProfanityLanguage()` when validating user-provided or config-provided language codes:

```ts
import {
	chatProfanityHandler,
	isSupportedProfanityLanguage
} from "@bigfootds/bigfootds-shared-data";

if (isSupportedProfanityLanguage("es")) {
	chatProfanityHandler.exists("texto", { languages: ["es"] });
}
```

## Word Lists

### devWordsArray

`devWordsArray` contains words reserved for BigfootDS staff or official BigfootDS usage.

These words are blocked for player/user names, but not censored in chat.

```ts
export const devWordsArray: string[] = [
	"bigfootds",
	"bigfoot",
	"bds",
	"developer",
	"staff"
];
```

### reservedWordsArray

`reservedWordsArray` contains platform-level words that should not be available to users as names.

These words are blocked for player/user names, but not censored in chat.

```ts
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
```

## Custom Datasets

Custom datasets are how this package should eventually support languages that `@2toad/profanity` does not ship by default.

The intended approach is:

1. Add a language-specific dataset file.
2. Keep the dataset as normalised lowercase strings.
3. Register that dataset with a `Profanity` instance using `addWords()`.
4. Add locale metadata so `getSupportedProfanityLanguageForLocale()` can resolve the language.
5. Add tests for positive matches, false-positive-sensitive words, and player-name behaviour.

### Dataset Shape

Prefer one file per language or locale:

```ts
// src/data/profanity/custom/nl.ts
export const dutchProfanityWords: string[] = [
	"example-profane-word"
];
```

Use these rules for dataset entries:

- Store entries in lowercase.
- Use Unicode-normalised text where possible.
- Keep words and phrases as plain strings.
- Avoid regex strings in datasets.
- Do not mix languages in one dataset file.
- Keep slurs, sexual terms, and general profanity reviewable by humans before release.

### Current Manual Usage

Until this package has first-class custom dataset registration, consumers can use the re-exported `Profanity` class directly:

```ts
import { Profanity } from "@bigfootds/bigfootds-shared-data";

const dutchProfanity = new Profanity({
	languages: ["en"],
	wholeWord: true,
	unicodeWordBoundaries: true
});

dutchProfanity.addWords([
	"example-profane-word"
]);

const hasProfanity = dutchProfanity.exists("example-profane-word");
```

Use at least one upstream-supported language in the `languages` option. `@2toad/profanity` validates language codes when it builds its matcher, even if custom words have been added with `addWords()`.

This is useful for experiments, but it should not become the long-term product integration pattern.

### Future First-Party API

The long-term implementation should add custom dataset support inside `src/profanityManager.ts`.

A likely API shape, not implemented yet:

```ts
import {
	createProfanityHandler,
	dutchProfanityWords
} from "@bigfootds/bigfootds-shared-data";

const dutchChatHandler = createProfanityHandler({
	baseLanguages: ["en"],
	customWords: dutchProfanityWords,
	wholeWord: true
});
```

The implementation should avoid mutating the shared singleton handlers for application-specific datasets. Instead, it should create isolated `Profanity` instances so one service cannot accidentally change filtering behaviour for another service.

### Adding a New Language

When adding support for a missing language:

1. Create a dataset file under `src/data/profanity/custom/`.
2. Export the dataset from a stable package subpath.
3. Add the locale to `targetProfanityLanguages` with `supportedByDefault: false`.
4. Add a mapping or handler registration path for that dataset.
5. Add tests covering chat and player-name checks for that language.
6. Update this document with the dataset source and review notes.

Do not add a language code to `supportedProfanityLanguages` unless `@2toad/profanity` supports it directly. Custom datasets should have separate metadata so default support and BigfootDS-added support remain distinguishable.

## Dependency Notes

`@2toad/profanity` is a runtime dependency because this package re-exports its API and uses it inside the exported handlers.

Useful upstream exports:

- `Profanity` - create isolated profanity filter instances.
- `profanity` - upstream default instance.
- `CensorType` - censoring mode enum.
- `profaneWords` - upstream built-in language datasets.

Use BigfootDS handlers for product code unless a service has a specific reason to create a custom `Profanity` instance.

# Profanity Lists

`pkg-shared-data` owns only static BigfootDS profanity/restricted-word list data and typed metadata.

Runtime profanity matching, text normalisation, `@2toad/profanity` integration, chat handlers, player-name handlers, language helpers, and censorship helpers now live in `@bigfootds/bigfootds-service-utils`.

## Public Exports

This package exports the static lists and metadata:

```ts
import {
	PROFANITY_LISTS,
	PROFANITY_LISTS_BY_ID,
	PROFANITY_LIST_IDS,
	devWordsArray,
	reservedWordsArray
} from "@bigfootds/bigfootds-shared-data";
```

Use `@bigfootds/bigfootds-service-utils` when product code needs runtime checks:

```ts
import {
	chatProfanityHandler,
	playerNameProfanityHandler
} from "@bigfootds/bigfootds-service-utils";
```

## Word Lists

### devWordsArray

`devWordsArray` contains words reserved for BigfootDS staff or official BigfootDS usage.

These words can be blocked for player/user names, but they should not automatically be treated as profane in chat.

### reservedWordsArray

`reservedWordsArray` contains platform-level words that should not be available to users as names.

These words can be blocked for player/user names, but they should not automatically be treated as profane in chat.

## Boundary

Do not add matching, normalisation, fuzzy matching, censorship, scoring, or moderation-policy helpers back into this package.

Custom datasets and `@2toad/profanity` wrapper behaviour belong in `pkg-service-utils` or a later dedicated moderation helper package.

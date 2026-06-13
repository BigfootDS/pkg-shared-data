# BigfootDS Shared Data

This package contains data used across multiple services, handled here in an effort to adhere to "D.R.Y" coding principles.

## First-Pass Ecosystem To-Do

This checklist tracks the first pass needed before downstream ecosystem work depends on this package.

- [ ] Deprecate or move runtime error constructors into `pkg-service-utils` once consumers have migrated.
- [ ] Deprecate or move profanity matching/normalisation helpers into `pkg-service-utils` or a dedicated moderation helper package once consumers have migrated.
- [ ] Review whether every `main` push should auto-bump and publish this data package.

The old `DataErrors` classes and profanity handlers are still exported for compatibility. New ecosystem work should prefer the static data/catalogue exports unless it deliberately needs those legacy helpers.

## Public Package Safety

This package is publicly published on NPM, so its contents must be safe for public-facing usage.

It should contain static, reviewable reference data only:

- public Project IDs, Project Kinds, and minimal Project Definitions
- safe client-facing global error codes and default messages
- shared TypeScript data shapes for future service response helpers
- baseline profanity/restricted-word lists and typed list metadata
- public Bigfoot Fetcher header/config metadata

Do not put secrets, credentials, private moderation notes, account data, private diagnostics, provider payloads, environment-specific service URLs, or mutable live-ops configuration in this package.

## Links

This package is published to these places:

* [NPM](https://www.npmjs.com/package/@bigfootds/bigfootds-shared-data)

## Installation

This is a scoped package, so its install command looks a little longer than normal. But it means you can guarantee that you'll be getting the package from BigfootDS!

`npm install @bigfootds/bigfootds-shared-data`

## TypeScript

This package ships generated TypeScript declarations with its compiled JavaScript output.

Use Project Definitions when services or tools need to validate or list known BigfootDS projects:

```ts
import {
	PROJECT_IDS,
	getProjectDefinition,
	isKnownProjectId
} from "@bigfootds/bigfootds-shared-data";

const projectDefinition = getProjectDefinition(PROJECT_IDS.GAME_THEBESTESTBEEHIVE);

if (isKnownProjectId("ms-auth")) {
	console.log(projectDefinition?.displayName);
}
```

Use the global error catalogue when a service needs stable public error metadata:

```ts
import {
	ERROR_CODES,
	getErrorCodeDefinition,
	type SharedErrorResponse
} from "@bigfootds/bigfootds-shared-data";

const definition = getErrorCodeDefinition(ERROR_CODES.RATE_LIMITED);

const response: SharedErrorResponse = {
	error: {
		code: ERROR_CODES.RATE_LIMITED,
		message: definition?.defaultMessage ?? "Too many requests. Try again later.",
		requestId: "req_123"
	}
};
```

Use profanity-list metadata when a consumer needs the static BigfootDS-owned lists without importing runtime matching helpers:

```ts
import {
	PROFANITY_LISTS_BY_ID,
	PROFANITY_LIST_IDS
} from "@bigfootds/bigfootds-shared-data";

const reservedWords = PROFANITY_LISTS_BY_ID[PROFANITY_LIST_IDS.RESERVED_WORDS].words;
```

Shared Bigfoot Fetcher metadata is exported here so services can configure headers without importing the fetch wrapper:

```ts
import {
	BIGFOOT_FETCHER_HEADER_NAMES,
	type BigfootDSConfig
} from "@bigfootds/bigfootds-shared-data";

const allowedHeaders = [
	"Content-Type",
	"Authorization",
	...BIGFOOT_FETCHER_HEADER_NAMES
];

const serviceMetadata: BigfootDSConfig = {
	productName: "@bigfootds/ms-auth",
	platformType: "api"
};
```

## Basic Usage

Import the package and use the static first-pass data:

```js
const bdsSharedData = require('@bigfootds/bigfootds-shared-data');

console.log(bdsSharedData.PROJECT_IDS.MS_AUTH);
console.log(bdsSharedData.getProjectDefinition("game-godmaker"));
console.log(bdsSharedData.getErrorCodeDefinition("auth_user_banned"));
```

Output:

```
ms-auth
{ id: 'game-godmaker', displayName: 'Godmaker', kind: 'game' }
{
  code: 'auth_user_banned',
  ownerArea: 'ms-auth',
  defaultHttpStatus: 403,
  defaultMessage: 'This account cannot be used.'
}
```

Compatibility profanity handlers are still available for existing consumers. New shared runtime matching behaviour should move to `pkg-service-utils` or a dedicated moderation helper package when consumers are ready to migrate.

```js
const { playerNameProfanityHandler } = require('@bigfootds/bigfootds-shared-data');

const result = playerNameProfanityHandler.check("bigfootds");

console.log(result.isAllowed);
console.log(result.hasDevWord);
```

Output:

```
false
true
```

Use the chat handler when only profanity should be detected or censored:

```js
const { chatProfanityHandler } = require('@bigfootds/bigfootds-shared-data');

console.log(chatProfanityHandler.exists("I like big butts and I cannot lie"));
```

Output:

```
true
```

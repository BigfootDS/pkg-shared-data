# BigfootDS Shared Data

This package contains data used across multiple services, handled here in an effort to adhere to "D.R.Y" coding principles.

## Links

This package is published to these places:

* [NPM](https://www.npmjs.com/package/@bigfootds/bigfootds-shared-data)

## Installation

This is a scoped package, so its install command looks a little longer than normal. But it means you can guarantee that you'll be getting the package from BigfootDS!

`npm install @bigfootds/bigfootds-shared-data`

## TypeScript

This package ships generated TypeScript declarations with its compiled JavaScript output.

```ts
import { playerNameProfanityHandler } from "@bigfootds/bigfootds-shared-data";

const result = playerNameProfanityHandler.check("admin");

if (!result.isAllowed) {
	console.log(result.matches);
}
```

## Basic Usage

Import the package and use the profanity handlers for context-specific checks:

```js
const bdsSharedData = require('@bigfootds/bigfootds-shared-data');

console.log("Top-level items in the package are:")
console.log(Object.keys(bdsSharedData));
console.log("Player name is allowed:")
console.log(bdsSharedData.playerNameProfanityHandler.isAllowed("admin"))
```

Output:

```
Top-level items in the package are:
[ 'WordBlacklists', 'WordLists', 'ProfanityHandlers', ... ]
Player name is allowed:
false
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


Use the player name handler when profanity, reserved words, and developer-only words should all be blocked:

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

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
import { WordBlacklists } from "@bigfootds/bigfootds-shared-data";

const reservedWords: string[] = WordBlacklists.DeveloperReserved;
```

## Basic Usage

Import the package and use it as an object:

```js
const bdsSharedData = require('@bigfootds/bigfootds-shared-data');

console.log("Top-level items in the package are:")
console.log(Object.keys(bdsSharedData));
console.log("Items within the WordBlacklists object are:")
console.log(Object.keys(bdsSharedData.WordBlacklists))
```

Output:

```
Top-level items in the package are:
[ 'WordBlacklists' ]
Items within the WordBlacklists object are:
[ 'ProfanityWords', 'DeveloperReserved' ]
```

Use the data appropriately!

```js
let profaneWord = "fuck";

if (bdsSharedData.WordBlacklists.ProfanityWords.includes(profaneWord)){
	console.log("Profanity detected: " + profaneWord);
}
```

Output:
```
Profanity detected: fuck
```


Object destructuring syntax is fine to use, too.

```js
const {WordBlacklists} = require('@bigfootds/bigfootds-shared-data');

console.log("Items within the WordBlacklists object are:")
console.log(Object.keys(WordBlacklists))

let profaneWord = "fuck";

if (WordBlacklists.ProfanityWords.includes(profaneWord)){
	console.log("Profanity detected: " + profaneWord);
}
```

Output:

```
Items within the WordBlacklists object are:
[ 'ProfanityWords', 'DeveloperReserved' ]
Profanity detected: fuck
```

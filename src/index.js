const { devWordArray, profanityArray } = require('./data/profanityList');


const WordBlacklists = {
	/**
	 * @type {string[]} - A list of lowercase strings considered profane, offensive, or otherwise incompatible with family-friendly content.
	 */
	ProfanityWords: profanityArray,
	/**
	 * @type {string[]} - A list of lowercase strings not considered profane, but are otherwise reserved for usage by BigfootDS staff.
	 */
	DeveloperReserved: devWordArray
}


module.exports = {
	WordBlacklists
}
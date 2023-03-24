const { devWordArray, profanityArray } = require('./data/profanityList');

module.exports = {
	WordBlacklists: {
		ProfanityWords: profanityArray,
		DeveloperReserved: devWordArray
	}
}
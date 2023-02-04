const { devWordArray, profanityArray } = require('./data/profanityList')

exports = {
	WordBlacklists: {
		ProfanityWords: profanityArray,
		DeveloperReserved: devWordArray
	}
}
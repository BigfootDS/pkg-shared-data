import { devWordArray, profanityArray } from "./data/profanityList";

export interface WordBlacklists {
	ProfanityWords: string[];
	DeveloperReserved: string[];
}

export const WordBlacklists: WordBlacklists = {
	ProfanityWords: profanityArray,
	DeveloperReserved: devWordArray
};

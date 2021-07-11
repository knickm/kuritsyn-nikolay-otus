export interface WordTranslate {
	fromLang: string;
	toLang: string;
	word: string;
	translate: string;
}

export interface ResponseOk {
	translations: Array<{ translation: string }>;
	word_count: number;
	character_count: number;
}

export interface ResponseError {
	code: number;
	error: string;
}
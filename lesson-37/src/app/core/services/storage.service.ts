import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseError, ResponseOk, WordTranslate } from '../models/word-translate';
import { SettingsService } from './settings.service';
import { TranslateService } from './translate.service';

const WORD_REMEMBERS = 'WORD_REMEMBERS';

@Injectable()
export class DBService {
	public listChange$ = new Subject<Array<WordTranslate>>();
	private _list: Array<WordTranslate> = [];

	constructor(private translateService: TranslateService, private settings: SettingsService) {
	}

	GetWord(word: string, fromLang: string): Observable<WordTranslate> {
		const res = this._list.find(w => w.fromLang === fromLang && w.word === word);
		return res ? of(res) : EMPTY;
	}

	LoadListOfWord(): void {
		const translate = localStorage.getItem(WORD_REMEMBERS);
		if (translate) {
			this._list = JSON.parse(translate) as Array<WordTranslate>;
			this.listChange$.next(this._list);
		}
	}

	StoreWord(word: WordTranslate): void {
		this._list.push(word);
		localStorage.setItem(WORD_REMEMBERS, JSON.stringify(this._list));
		this.listChange$.next(this._list);
	}

	StoreText(text: string, fromLang: string, toLang: string): Observable<WordTranslate[]> {
		const list = text.split(/\s+/).map(w => w.trim().toLowerCase()).filter(w => !!w);
		const newWords = list
			.filter(w => !this._list.find(v => v.fromLang === fromLang && v.toLang === toLang && v.word === w));

		const s = this.settings.GetSettings();
		if (s !== null) {
			return this.translateService
				.sendData({ text: newWords, model_id: `${fromLang}-${toLang}` }, s.urlKey)
				.pipe(
					map(res => {
						newWords.forEach((word, i) => this._list.push({
							fromLang, toLang, word, translate: res.translations[i].translation.trim().toLowerCase()
						}));
						localStorage.setItem(WORD_REMEMBERS, JSON.stringify(this._list));
						this.listChange$.next([...this._list]);
						return this._list;
					}));
		}
		return EMPTY;
	}
}
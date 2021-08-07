import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

const WORD_REMEMBERS_SETTINGS = 'WORD_REMEMBERS_SETTINGS';

@Injectable()
export class SettingsService {
	constructor() {
	}

	GetSettings(): Settings | null {
		const settings = localStorage.getItem(WORD_REMEMBERS_SETTINGS);
		return settings ? JSON.parse(settings) : null;
	}

	StoreSettings(settings: Settings): void {
		localStorage.setItem(WORD_REMEMBERS_SETTINGS, JSON.stringify(settings));
	}
}
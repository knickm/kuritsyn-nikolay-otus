import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/config/config.service';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {
	private theme: string;

	constructor(config: AppConfig) {
		this.theme = localStorage.getItem('theme') || config.themeList[0].code;
	}

	setTheme(theme: string) {
		this.theme = theme;
		localStorage.setItem('theme', theme);
	}

	getTheme(): string {
		return this.theme;
	}
}

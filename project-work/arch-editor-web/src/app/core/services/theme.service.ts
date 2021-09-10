import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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


// private theme: BehaviorSubject<string>;

// constructor(@Inject(APP_CONFIG) config: Config) {
// 	const code = localStorage.getItem('theme') || config.themeList[0].code;
// 	this.theme = new BehaviorSubject<string>(
// 		code
// 	);
// }

// setTheme(theme: string) {
// 	this.theme.next(theme);
// 	localStorage.setItem('theme', this.theme.value.toString());
// }

// getTheme(): Observable<string> {
// 	return this.theme;
// }

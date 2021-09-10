import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import { AppConfig } from 'src/app/config/config.service';
import { IThemeDescription } from 'src/app/core/interfaces/theme';

@Component({
	selector: 'app-theme-switch-view',
	templateUrl: './theme-switch-view.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitchViewComponent {

	readonly themeList: Array<IThemeDescription>;

	themeCode: string;

	@Input()
	set theme(v: string | null) {
		if (v !== null) {
			this.themeCode = v;
			this.selectedIdx = this.themeList[0].code === v ? 0 : 1;
		}
	}

	@Output()
	submitted = new EventEmitter<string>();

	private selectedIdx = 0;
	get checked(): boolean {
		return this.selectedIdx === 1;
	}

	constructor(config: AppConfig) {
		this.themeList = [...config.themeList];
		this.themeCode = this.themeList[0].code;
	}

	onSwitch() {
		this.selectedIdx = this.selectedIdx === 0 ? 1 : 0;
		this.submitted.emit(this.themeList[this.selectedIdx].code);
	}
}

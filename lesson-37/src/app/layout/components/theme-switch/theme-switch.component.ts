import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { faFlag, faFillDrip } from '@fortawesome/free-solid-svg-icons';

import { AppConfig } from 'src/app/config/config.service';
import { IThemeDescription } from 'src/app/core/interfaces/theme';

@Component({
	selector: 'app-theme-switch-view',
	templateUrl: './theme-switch.component.html',
	styles: [`
		.selected {
			color: #2cd10a;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSwitchViewComponent {
	readonly faFillDrip = faFillDrip;
	readonly faFlag = faFlag;

	readonly themeList: Array<IThemeDescription>;

	themeCode: string;

	@Input()
	set theme(v: string | null) {
		if (v !== null) {
			this.themeCode = v;
		}
	}

	@Output()
	submitted = new EventEmitter<string>();

	constructor(config: AppConfig) {
		this.themeList = [...config.themeList];
		this.themeCode = this.themeList[0].code;
	}

	changeTheme(theme: string) {
		this.submitted.emit(theme);
	}
}

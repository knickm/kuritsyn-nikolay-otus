import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { faGlobeAfrica, faFlag } from '@fortawesome/free-solid-svg-icons';

import { AppConfig } from 'src/app/config/config.service';
import { ILangDescription } from 'src/app/core/interfaces/lang';

@Component({
	selector: 'app-lang-switch-view',
	templateUrl: './lang-switch.component.html',
	styles: [`
		.selected {
			color: #2cd10a;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitchViewComponent {
	readonly faGlobeAfrica = faGlobeAfrica;
	readonly faFlag = faFlag;

	readonly langList: Array<ILangDescription>;

	langCode: string;
	@Input()
	set lang(v: string | null) {
		if (v !== null) {
			this.langCode = v;
		}
	}

	@Output()
	submitted = new EventEmitter<string>();

	constructor(config: AppConfig) {
		this.langList = [...config.langList];
		this.langCode = this.langList[0].code;
	}

	changeLanguage(lang: string) {
		this.submitted.emit(lang);
	}
}

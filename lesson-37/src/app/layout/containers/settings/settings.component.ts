import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import { AppConfig } from 'src/app/config/config.service';
import { ILangDescription } from 'src/app/core/interfaces/lang';
import { Settings } from 'src/app/core/models/settings';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	loading = false;
	readonly faSave = faSave;
	settings: Settings | null = null;

	readonly langList: Array<ILangDescription>;

	get Form(): FormGroup {
		return this.form;
	}
	private form: FormGroup = new FormGroup({});

	get FromLangCtrl(): FormControl {
		return this.fromLangCtrl;
	}
	private fromLangCtrl = new FormControl(null, [Validators.required]);

	get ToLangCtrl(): FormControl {
		return this.toLangCtrl;
	}
	private toLangCtrl = new FormControl(null, [Validators.required]);

	get NumberWordsCtrl(): FormControl {
		return this.numberWordsCtrl;
	}
	private numberWordsCtrl = new FormControl(null, [Validators.required]);

	get DurationCtrl(): FormControl {
		return this.durationCtrl;
	}
	private durationCtrl = new FormControl(null, [Validators.required]);

	get ApiKeyCtrl(): FormControl {
		return this.apiKeyCtrl;
	}
	private apiKeyCtrl = new FormControl(null, [Validators.required]);

	get UrlKeyCtrl(): FormControl {
		return this.urlKeyCtrl;
	}
	private urlKeyCtrl = new FormControl(null, [Validators.required]);

	constructor(config: AppConfig, private settingsService: SettingsService) {
		this.langList = [...config.langList];
		this.fromLangCtrl.setValue(this.langList[0].code);
		this.toLangCtrl.setValue(this.langList[1].code);
		this.resetCtrls();
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			fromLang: this.fromLangCtrl,
			toLang: this.toLangCtrl,
			numberWords: this.numberWordsCtrl,
			duration: this.durationCtrl,
			apiKey: this.apiKeyCtrl,
			urlKey: this.urlKeyCtrl,
		});
	}

	saveSettings() {
		this.settingsService.StoreSettings(this.form.value)
		this.settings = this.form.value;
		this.resetCtrls();
	}

	resetCtrls() {
		const s = this.settingsService.GetSettings();
		if (s) {
			this.settings = s;
			this.fromLangCtrl.setValue(s.fromLang);
			this.toLangCtrl.setValue(s.toLang);
			this.numberWordsCtrl.setValue(s.numberWords);
			this.durationCtrl.setValue(s.duration);
			this.apiKeyCtrl.setValue(s.apiKey);
			this.urlKeyCtrl.setValue(s.urlKey);
		}
	}
}

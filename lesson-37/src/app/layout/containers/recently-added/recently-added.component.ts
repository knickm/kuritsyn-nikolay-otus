import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/config.service';
import { WordTranslate } from 'src/app/core/models/word-translate';
import { SettingsService } from 'src/app/core/services/settings.service';
import { DBService } from 'src/app/core/services/storage.service';

export interface PeriodicElement {
	word: string;
	translate: string;
	lang: string;
}

@Component({
	selector: 'app-recently-added',
	templateUrl: './recently-added.component.html',
	styleUrls: ['./recently-added.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedComponent implements OnInit {
	displayedColumns: string[] = ['word', 'translate', 'lang'];
	dataSource: Array<any> = [];

	get Form(): FormGroup {
		return this.form;
	}
	private form: FormGroup = new FormGroup({});

	constructor(
		private cdRef: ChangeDetectorRef,
		private storage: DBService,
		private settingsService: SettingsService) {
		this.storage.listChange$.subscribe(
			list => (this.dataSource = list.map(w => ({
				word: w.word,
				translate: w.translate,
				lang: w.fromLang + ' => ' + w.toLang
			})), this.cdRef.detectChanges())
		);
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			Word: new FormControl(null, [Validators.required]),
		});
		this.storage.LoadListOfWord();
	}

	sendData() {
		const wordCtl = this.form.get('Word');
		const s = this.settingsService.GetSettings();
		if (wordCtl && s !== null) {
			this.storage.StoreText(wordCtl.value, s.fromLang, s.toLang).subscribe(
				list => (this.dataSource = list.map(w => ({
					word: w.word,
					translate: w.translate,
					lang: w.fromLang + ' => ' + w.toLang
				})), this.cdRef.detectChanges())
			);
		}
	}
}

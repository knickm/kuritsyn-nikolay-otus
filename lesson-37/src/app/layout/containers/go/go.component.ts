import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WordTranslate } from 'src/app/core/models/word-translate';
import { SettingsService } from 'src/app/core/services/settings.service';
import { DBService } from 'src/app/core/services/storage.service';
import { shuffle } from 'src/app/core/util/array';

@Component({
	selector: 'app-go',
	host: { class: 'flex-column flex-grow-100 justify-center align-center' },
	templateUrl: './go.component.html',
	styleUrls: ['./go.component.scss']
})
export class GoComponent implements OnInit {

	started = false;
	duration = 0;

	private timer: any = -1;
	private position = 0;
	words: Array<WordTranslate> = [];
	selectedWord: WordTranslate | null = null;

	result = 0;

	get Form(): FormGroup {
		return this.form;
	}
	private form: FormGroup = new FormGroup({});

	private get NextWord(): WordTranslate {
		return this.words[this.position++ % this.words.length];
	}

	constructor(
		private cdRef: ChangeDetectorRef,
		private settings: SettingsService,
		private storage: DBService,
	) {
		const s = this.settings.GetSettings();
		if (s) {
			this.storage.listChange$.subscribe(
				list => {
					this.words = [...list.filter(w => w.fromLang === s.fromLang && w.toLang === s.toLang)];
					shuffle(this.words);
					if (this.words.length > s.numberWords) {
						this.words.length = s.numberWords;
					}
				}
			);
			storage.LoadListOfWord();
		}
	}

	ngOnInit(): void {
		this.form = new FormGroup({
			Word: new FormControl(null, [Validators.required]),
		});
	}

	checkWord() {
		console.log(this.selectedWord?.translate, this.form.get('Word')?.value);
		if (this.selectedWord?.translate === this.form.get('Word')?.value) {
			this.result++;
		}
		this.form.get('Word')?.setValue('');
		if (this.words.length === this.position) {
			this.started = false;
			clearInterval(this.timer);
		}
		this.selectedWord = this.NextWord;
	}

	onStart() {
		const settings = this.settings.GetSettings()
		if (settings) {
			this.started = true;
			this.selectedWord = this.NextWord;
			this.duration = settings.duration * 60;
			this.timer = setInterval(() => {
				console.log(this.duration);
				if (--this.duration === 0) {
					this.started = false;
					clearInterval(this.timer);
				}
				this.cdRef.detectChanges();
			}, 1000);
		}
	}

	floor(n: number): number {
		return Math.floor(n);
	}
}

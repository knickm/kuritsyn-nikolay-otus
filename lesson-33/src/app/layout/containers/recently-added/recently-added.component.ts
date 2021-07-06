import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DBService } from 'src/app/core/services/storage';

@Component({
	selector: 'app-recently-added',
	templateUrl: './recently-added.component.html',
	styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnInit {
	loading = false;

	wordList$ = this.storage.listChange$;
	get Form(): FormGroup {
		return this.form;
	}
	private form: FormGroup = new FormGroup({});

	constructor(private storage: DBService) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			Word: new FormControl(null, [Validators.required]),
		});
	}

	sendData() {
		// this.loading = true;
		const wordCtl = this.form.get('Word');
		if (wordCtl) {
			// this.submitTodo.emit(wordCtl.value);
			this.storage.StoreText(wordCtl.value, "en", "ru");
		}
	}
}

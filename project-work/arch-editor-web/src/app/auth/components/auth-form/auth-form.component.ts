import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAuthParams } from 'src/app/core/models/user';

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrls: ['./auth-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
	@Input()
	loading: boolean | null = false;

	@Output()
	loginSubmitted = new EventEmitter<IAuthParams>();

	get LoginCtrl(): FormControl {
		return this.loginCtrl;
	}
	private loginCtrl = new FormControl(null, [
		Validators.required
	]);

	get PasswordCtrl(): FormControl {
		return this.passwordCtrl;
	}
	private passwordCtrl = new FormControl(null, [
		Validators.required,
	]);

	get AuthForm(): FormGroup {
		return this.authForm;
	}
	private authForm: FormGroup = new FormGroup({});


	constructor() { }

	ngOnInit() {
		this.authForm = new FormGroup({
			login: this.loginCtrl,
			password: this.passwordCtrl,
		});
	}

	onLogin() {
		this.loginSubmitted.emit({
			login: this.loginCtrl.value,
			password: this.passwordCtrl.value,
		});

	}
}

import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/core/models/user';

@Component({
	selector: 'app-header',
	template: '<app-header-view [User]="User"></app-header-view>',
})
export class HeaderComponent {
	@Input()
	User: IUser | null = null;

	constructor() { }
}

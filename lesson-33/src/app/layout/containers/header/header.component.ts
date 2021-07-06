import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	template: '<app-top-menu (onAction)=actionHandler($event)></app-top-menu>',
})
export class HeaderComponent {
	@Output()
	onAction = new EventEmitter<string>();

	constructor() { }

	actionHandler(action: any) {
		this.onAction.emit(action);
	}
}

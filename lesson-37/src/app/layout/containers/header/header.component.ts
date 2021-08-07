import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-header',
	template: '<app-top-menu></app-top-menu>',
})
export class HeaderComponent {
	constructor() { }
}

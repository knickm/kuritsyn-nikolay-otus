import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { IMenu } from 'src/app/core/interfaces/top-menu';

@Component({
	selector: 'app-top-menu-view',
	templateUrl: './top-menu-view.component.html',
	styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent {
	faCog = faCog;

	@Input()
	Items: IMenu[] = [];

	@Output()
	onAction = new EventEmitter<string>();

	constructor() { }

	handlerAction(event$: string | undefined) {
		if (event$) {
			this.onAction.emit(event$);
		}
	}
}

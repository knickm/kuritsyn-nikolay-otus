import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenu } from 'src/app/core/interfaces/top-menu';

@Component({
	selector: 'app-top-menu-view',
	templateUrl: './top-menu-view.component.html',
	styleUrls: ['./top-menu-view.component.scss']
})
export class TopMenuViewComponent implements OnInit {
	@Output()
	onAction = new EventEmitter<string>();

	@Input()
	Items: IMenu[] = [];

	constructor() { }

	ngOnInit(): void {
	}

	onClick(event$: string | undefined) {
		if (event$) {
			this.onAction.emit(event$);
		}
	}
}

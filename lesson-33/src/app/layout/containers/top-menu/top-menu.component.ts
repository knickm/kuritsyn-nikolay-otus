import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { createFromJson, IMenu } from 'src/app/core/interfaces/top-menu';
import TopMenu from './top-menu.json';

@Component({
	selector: 'app-top-menu',
	template: '<app-top-menu-view (onAction)=actionHandler($event) [Items]="menuItems"></app-top-menu-view>',
})
export class TopMenuComponent implements OnInit {

	@Output()
	onAction = new EventEmitter<string>();

	menuItems: IMenu[] = [];

	constructor() { }

	ngOnInit(): void {
		this.menuItems = TopMenu.Items.map(item => createFromJson(item, (conditions: string[]) => {
			let condition = false;
			conditions.forEach(c => {
				if (!condition) {
					switch (c) {
						case "IS_AUTH":
							condition = true;
							break;
						case "FILE_OPEN":
							condition = true;
							break;
					}
				}
			});
			return condition
		}));
	}

	actionHandler(action: any) {
		this.onAction.emit(action);
	}

}

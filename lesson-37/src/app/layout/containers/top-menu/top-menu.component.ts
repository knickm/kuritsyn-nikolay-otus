import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/core/interfaces/top-menu';
import { createFromJson } from 'src/app/core/util/menu';
import TopMenu from './top-menu.json';

@Component({
	selector: 'app-top-menu',
	template: '<app-top-menu-view [Items]="menuItems"></app-top-menu-view>',
})
export class TopMenuComponent implements OnInit {
	menuItems: IMenu[] = [];

	constructor() { }

	ngOnInit(): void {
		this.menuItems = TopMenu.Items.map(item => createFromJson(item));
	}
}

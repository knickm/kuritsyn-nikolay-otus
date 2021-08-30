import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
	selector: 'app-elements-menu',
	host: {
		class: 'flex-column'
	},
	templateUrl: './elements-menu.component.html',
	styleUrls: ['./elements-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementsMenuComponent implements OnInit {

	selected = '';

	constructor(
		private store: Store<fromStore.menuState.IMenuState>
	) { }

	ngOnInit(): void {
	}

	select(element: string) {
		this.selected = element;
		this.store.dispatch(fromStore.menuAction.MenuSelect({ element }));
	}
}

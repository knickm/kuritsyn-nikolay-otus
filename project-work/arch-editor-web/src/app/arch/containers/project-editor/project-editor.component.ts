import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
	selector: 'app-project-editor',
	host: {
		class: 'flex-row justify-between'
	},
	template: '<app-elements-menu class="p-4"></app-elements-menu><app-plot [element]="element$ | async" ></app-plot><app-elements-property></app-elements-property>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEditorComponent implements OnInit {

	element$ = this.store.pipe(select(fromStore.menuSelector.getMenuElement));

	constructor(
		private store: Store<fromStore.menuState.IMenuState>
	) { }

	ngOnInit(): void {
	}

}

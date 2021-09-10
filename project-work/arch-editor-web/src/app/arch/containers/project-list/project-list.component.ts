import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromArchStore from '../../store';

@Component({
	selector: 'app-project-list',
	template: '<app-project-list-view [List]="list$ | async"></app-project-list-view>',
})
export class ProjectListComponent implements OnInit {

	list$ = this.store.pipe(
		select(fromArchStore.projectSelector.getProjectList)
	);

	constructor(
		private store: Store<fromArchStore.projectState.IProjectState>
	) { }

	ngOnInit(): void {
		this.store.dispatch(fromArchStore.projectAction.LoadList());
	}

}

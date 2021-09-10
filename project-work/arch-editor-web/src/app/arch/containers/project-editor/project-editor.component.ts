import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IElement } from '../../models/interfaces';
import { IProject } from '../../models/project';

import * as fromStore from '../../store';

@Component({
	selector: 'app-project-editor',
	host: {
		class: 'flex-row justify-between'
	},
	template: `
<app-elements-menu class="p-4"
></app-elements-menu><app-plot
	[project]="project$ | async"
	[element]="element$ | async"
	[name]="name"
	[description]="description"
	(onSelectedElement)="onSelected($event)"
	(onSave)="onSave($event)"
></app-plot><app-elements-property
	[name]="selectedElement ? selectedElement.name : ''"
	(onName)="changeName($event)"
	[description]="selectedElement ? selectedElement.description||'' : ''"
	(onDescription)="changeDescription($event)"
></app-elements-property>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectEditorComponent implements OnInit {

	element$ = this.storeMenu.pipe(select(fromStore.menuSelector.getMenuElement));
	project$ = this.storeProject.pipe(select(fromStore.projectSelector.getProject));

	selectedElement: IElement | null = null;

	name = '';
	description = '';

	constructor(
		private cdRef: ChangeDetectorRef,
		private storeMenu: Store<fromStore.menuState.IMenuState>,
		private storeProject: Store<fromStore.projectState.IProjectState>,
		private activateRoute: ActivatedRoute,
	) {

	}

	ngOnInit(): void {
		const id = this.activateRoute.snapshot.params['id'];
		this.storeProject.dispatch(fromStore.projectAction.Open({ id }));
	}

	onSelected(event: IElement) {
		this.selectedElement = { ...event };
		this.cdRef.markForCheck();
	}

	changeName(v: string) {
		this.name = v;
		this.cdRef.markForCheck();
	}

	changeDescription(v: string) {
		this.description = v;
		this.cdRef.markForCheck();
	}

	onSave(p: IProject) {
		this.storeProject.dispatch(fromStore.projectAction.Save(p))
	}
}

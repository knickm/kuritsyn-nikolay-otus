import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { map, catchError, tap, finalize, switchMap } from 'rxjs/operators';

import { IResponseMessage } from 'src/app/core/interfaces';
import * as fromCore from 'src/app/core/store';

import * as fromAction from '../actions/project.action';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Injectable()
export class ProjectEffects {

	open$ = createEffect(() =>
		this.actions$.pipe(
			// Filters by Action Creator 'Login'
			ofType(fromAction.Open),
			tap(_ => this.coreStore.dispatch(fromCore.LoadingAction({ loading: true }))),
			switchMap(action => this.projectServices.open(action.id).pipe(
				map(project => {
					return fromAction.OpenSuccess(project);
				}),
				catchError((error: IResponseMessage) => of(fromAction.Fail(error))),
				finalize(() => this.coreStore.dispatch(fromCore.LoadingAction({ loading: false })))
			)),
		)
	);

	load$ = createEffect(() =>
		this.actions$.pipe(
			// Filters by Action Creator 'Login'
			ofType(fromAction.LoadList),
			tap(_ => this.coreStore.dispatch(fromCore.LoadingAction({ loading: true }))),
			switchMap(_ => this.projectServices.load().pipe(
				map(list => {
					return fromAction.LoadSuccess({ list });
				}),
				catchError((error: IResponseMessage) => of(fromAction.Fail(error))),
				finalize(() => this.coreStore.dispatch(fromCore.LoadingAction({ loading: false })))
			)),
		)
	);

	save$ = createEffect(() =>
		this.actions$.pipe(
			// Filters by Action Creator 'Login'
			ofType(fromAction.Save),
			tap(_ => this.coreStore.dispatch(fromCore.LoadingAction({ loading: true }))),
			switchMap(project => this.projectServices.save(project).pipe(
				map(project => {
					return fromAction.SaveSuccess({ id: project as number });
				}),
				catchError((error: IResponseMessage) => of(fromAction.Fail(error))),
				finalize(() => this.coreStore.dispatch(fromCore.LoadingAction({ loading: false })))
			)),
		)
	);

	constructor(
		private actions$: Actions,
		private projectServices: ProjectService,
		private coreStore: Store<fromCore.ICoreState>,
	) { }
}

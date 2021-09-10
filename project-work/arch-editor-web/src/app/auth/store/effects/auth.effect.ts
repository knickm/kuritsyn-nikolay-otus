import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { map, catchError, exhaustMap, tap, finalize, switchMap } from 'rxjs/operators';

import { IUser } from 'src/app/core/models/user';
import { IResponseMessage } from 'src/app/core/interfaces';
import * as fromCore from 'src/app/core/store';

import { AuthService } from '../../services/auth.service';
import * as fromAction from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

	login$ = createEffect(() =>
		this.actions$.pipe(
			// Filters by Action Creator 'Login'
			ofType(fromAction.Login),
			tap(_ => this.coreStore.dispatch(fromCore.LoadingAction({ loading: true }))),
			switchMap(action => this.authServices.login(action).pipe(
				map(user => {
					this.router.navigate(['arch/project-list']);
					return fromAction.AuthSuccess(user as IUser);
				}),
				catchError((error: IResponseMessage) => of(fromAction.AuthFail(error))),
				finalize(() => this.coreStore.dispatch(fromCore.LoadingAction({ loading: false })))
			)),
		)
	);

	constructor(
		private actions$: Actions,
		private authServices: AuthService,
		private coreStore: Store<fromCore.ICoreState>,
		private router: Router,
	) { }
}

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/config.service';

import { ThemeService } from '../../services/theme.service';
import * as fromAction from '../actions';
import * as fromTheme from '../reducers/theme.reducer';

@Injectable()
export class ThemeEffects {

	initTheme$ = createEffect(() =>
		this.actions$.pipe(
			// Filters by Action Creator 'InitTheme'
			ofType(fromAction.InitTheme),
			tap(_ => {
				const code = this.themeService.getTheme();
				const theme = [...this.config.themeList.filter(t => t.code === code)]
				this.store.dispatch(fromAction.SetTheme(theme[0]));
			})
		), { dispatch: false }
	);

	setTheme$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fromAction.SetTheme),
			tap(theme => this.themeService.setTheme(theme.code)),
		), { dispatch: false }
	);

	constructor(
		private config: AppConfig,
		private themeService: ThemeService,
		private actions$: Actions,
		private store: Store<fromTheme.ThemeState>
	) { }
}

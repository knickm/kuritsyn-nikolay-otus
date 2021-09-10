import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { tap } from 'rxjs/operators';

import * as fromAction from '../actions';
import { NotifyComponent } from 'src/app/shared/containers/notify.component';

@Injectable()
export class NotifyEffects {
	showNotify$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fromAction.ShowNotify),
			tap(() => this.snackBar.openFromComponent(NotifyComponent, { duration: 5000 })),
		), { dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private snackBar: MatSnackBar
	) { }
}

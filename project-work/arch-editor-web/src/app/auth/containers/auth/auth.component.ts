import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { IAuthParams } from 'src/app/core/models/user';
import { MessageWindowComponent } from 'src/app/shared/components/message-window/message-window.component';
import { IResponseMessage } from 'src/app/core/interfaces';

import * as fromStore from '../../store';

@Component({
	selector: 'app-auth',
	host: { class: 'flex-column flex-grow-100 justify-center' },
	template: `
    <app-auth-form
        (loginSubmitted)="onLoginSubmit($event)"
        [loading]="loading$ | async"
    ></app-auth-form>
  `,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
	loading$ = this.store.select(fromStore.getAuthLoading);
	private unsubscribe$ = new Subject();

	constructor(private store: Store<fromStore.IAuthState>, public dialog: MatDialog) {
	}

	ngOnInit() {
		this.store.pipe(
			select(fromStore.getAuthError),
			filter(msg => msg !== null),
			takeUntil(this.unsubscribe$)
		).subscribe(error => this.showError(error || ''));
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	onLoginSubmit(authParams: IAuthParams) {
		this.store.dispatch(fromStore.Login(authParams));
	}

	private showError(error: string | IResponseMessage) {
		const e = typeof (error) === 'string' ? error : error.message;
		// this.dialog
		// 	.open(MessageWindowComponent, {
		// 		height: '50%',
		// 		width: '50%',
		// 		data: { error: e || 'SERVICE.serverError' }
		// 	})
		// 	.afterClosed()
		// 	.pipe(
		// 		takeUntil(this.unsubscribe$)
		// 	)
		// 	.subscribe(() => this.store.dispatch(fromStore.Clear()));
	}

}

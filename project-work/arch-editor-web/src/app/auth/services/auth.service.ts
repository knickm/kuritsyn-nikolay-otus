import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, concat, Observable, of } from 'rxjs';

import { basicCredentials, IAuthParams, IUser } from 'src/app/core/models/user';
import * as fromAuthState from '../store/states';
import * as fromAuthSelector from '../store/selectors';

import { LoginService } from './login.service';
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
	private user$ = this.store.select(fromAuthSelector.getAuthUser);
	private authParams$ = this.store.select(fromAuthSelector.getAuthParams);

	constructor(
		private loginServices: LoginService,
		private store: Store<fromAuthState.IAuthState>
	) {
	}

	private isLogged(): Observable<boolean> {
		return this.user$.pipe(
			switchMap(u => of(u !== null))
		)
	}

	public isAuthenticated(): Observable<IAuthParams | null> {
		return this.isLogged().pipe(
			switchMap(v => v ? this.authParams$ : of(null))
		);
	}

	login(authParams: IAuthParams): Observable<IUser | null> {
		const headers = new HttpHeaders().set('Authorization', basicCredentials(authParams));
		return this.loginServices.getData(undefined, { headers });
	}
}

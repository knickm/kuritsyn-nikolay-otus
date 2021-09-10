import { Action, createReducer, on } from '@ngrx/store';

import { IUser } from 'src/app/core/models/user';

import * as fromAction from '../actions';
import { IAuthState } from '../states';

const initialState: IAuthState = {
	user: null,
	params: null,
	loading: false,
	error: null,
	message: null
};

const authReducer = createReducer<IAuthState>(
	initialState,
	on(fromAction.Login, (state, params) => ({ ...state, loading: true, user: null, error: null, params, message: null })),
	on(fromAction.Logout, state => ({ ...state, loading: false, user: null })),

	on(fromAction.AuthSuccess, (state, user) => ({ ...state, loading: false, user })),
	on(fromAction.AuthFail, (state, error) => ({ ...state, loading: false, error })),
);

export function reducer(state: IAuthState | undefined, action: Action) {
	return authReducer(state, action);
}

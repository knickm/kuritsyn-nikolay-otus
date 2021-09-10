import { createAction, props } from '@ngrx/store';
import { IUser, IAuthParams } from 'src/app/core/models/user';
import { IResponseMessage } from 'src/app/core/interfaces';

enum AuthActionTypes {
	AUTH_LOGIN = '[Auth] Login',
	AUTH_LOGOUT = '[Auth] Logout',

	AUTH_SUCCESS = '[Auth] Auth success',
	AUTH_FAIL = '[Auth] Auth error',
}

export const Login = createAction(AuthActionTypes.AUTH_LOGIN, props<IAuthParams>());
export const Logout = createAction(AuthActionTypes.AUTH_LOGOUT);

export const AuthSuccess = createAction(AuthActionTypes.AUTH_SUCCESS, props<IUser>());
export const AuthFail = createAction(AuthActionTypes.AUTH_FAIL, props<IResponseMessage>());

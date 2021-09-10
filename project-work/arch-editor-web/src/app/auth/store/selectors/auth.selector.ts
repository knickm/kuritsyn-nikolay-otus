import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../states';

export const getAuthFeatureState = createFeatureSelector<IAuthState>('auth');

export const getAuthState = createSelector(
	getAuthFeatureState,
	(state: IAuthState) => state
);

export const getAuthUser = createSelector(
	getAuthState,
	(state: IAuthState) => state.user
);

export const getAuthLoading = createSelector(
	getAuthState,
	(state: IAuthState) => state.loading
);

export const getAuthError = createSelector(
	getAuthState,
	(state: IAuthState) => state.error
);

export const getAuthParams = createSelector(
	getAuthState,
	(state: IAuthState) => state.params
);

export const getAuthMessage = createSelector(
	getAuthState,
	(state: IAuthState) => state.message
);

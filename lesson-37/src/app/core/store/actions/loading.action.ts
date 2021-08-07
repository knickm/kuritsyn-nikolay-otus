import { createAction, props } from '@ngrx/store';

export enum LoadingActionTypes {
	LOADING = '[Core] Show/Hide loading'
}

export const LoadingAction = createAction(LoadingActionTypes.LOADING, props<{ loading: boolean }>());

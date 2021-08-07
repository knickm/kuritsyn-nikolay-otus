import { createReducer, on, Action } from '@ngrx/store';
import * as fromAction from '../actions';

export interface LoadingState {
	loading: boolean;
}

const initialState: LoadingState = {
	loading: false
};

const lLoadingfReducer = createReducer(
	initialState,
	on(fromAction.LoadingAction, (_, prop) => prop)
);

export function loadingReducer(state: LoadingState | undefined, action: Action) {
	return lLoadingfReducer(state, action);
}


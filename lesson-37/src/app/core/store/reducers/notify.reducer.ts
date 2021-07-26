import { createReducer, on, Action } from '@ngrx/store';
import * as fromAction from '../actions';

export interface NotifyState {
	message: string;
}

const initialState: NotifyState = {
	message: ''
};

const lNotifyReducer = createReducer(
	initialState,
	on(fromAction.ShowNotify, (_, prop) => prop)
);

export function notifyReducer(state: NotifyState | undefined, action: Action) {
	return lNotifyReducer(state, action);
}


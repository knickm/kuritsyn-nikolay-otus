import { createReducer, on, Action } from '@ngrx/store';
import * as fromAction from '../actions';

export interface ThemeState {
	code: string;
}

const initialState: ThemeState = {
	code: ''
};

const lThemeReducer = createReducer(
	initialState,
	on(fromAction.SetTheme, (_, prop) => prop)
);

export function themeReducer(state: ThemeState | undefined, action: Action) {
	return lThemeReducer(state, action);
}


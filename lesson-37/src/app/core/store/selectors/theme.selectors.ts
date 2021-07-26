import { createSelector } from '@ngrx/store';
import { getCoreState, ICoreState } from '../state';
import { ThemeState } from '../reducers';

const getThemeState = createSelector(
	getCoreState,
	(state: ICoreState) => state.theme
);

export const getTheme = createSelector(
	getThemeState,
	(state: ThemeState) => state.code
);

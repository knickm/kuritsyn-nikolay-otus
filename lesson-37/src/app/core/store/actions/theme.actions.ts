import { createAction, props } from '@ngrx/store';

export enum ThemeActionTypes {
	INIT_THEME = '[Theme] Initcialise theme',
	SET_THEME = '[Theme] Change theme'
}

export const InitTheme = createAction(ThemeActionTypes.INIT_THEME);

export const SetTheme = createAction(ThemeActionTypes.SET_THEME, props<{ code: string }>());

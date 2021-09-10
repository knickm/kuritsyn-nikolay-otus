import { createAction, props } from '@ngrx/store';

export enum MenuActionTypes {
	MENU_SELECT = '[Menu] Select',
}

// выбрали елемент меню
export const MenuSelect = createAction(MenuActionTypes.MENU_SELECT, props<{ element: string }>());

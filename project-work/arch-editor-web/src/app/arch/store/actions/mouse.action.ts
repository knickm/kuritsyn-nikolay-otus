import { createAction, props } from '@ngrx/store';
import { IPoint } from '../../models/point';

export enum MouseActionTypes {
	MOUSE_DOWN = '[Mouse] Down',
	MOUSE_UP = '[Mouse] Up',
	MOUSE_OUT = '[Mouse] Out',
	MOUSE_MOVE = '[Mouse] Move',
	MOUSE_WHEEL = '[Mouse] Wheel',
	MOUSE_DOUBLE = '[Mouse] Double'
}

// кнопка мыши нажата
export const MouseDown = createAction(MouseActionTypes.MOUSE_DOWN, props<{ elementId: string }>());

// кнопка мыши отпущена
export const MouseUp = createAction(MouseActionTypes.MOUSE_UP, props<{ elementId: string }>());

// указатель мыши покинул объект
export const MouseOut = createAction(MouseActionTypes.MOUSE_OUT, props<{ elementId: string }>());

// перемещение мыши
export const MouseMove = createAction(MouseActionTypes.MOUSE_MOVE, props<{ elementId: string, position: IPoint }>());

// прокрутка колеса мыши
export const MouseWheel = createAction(MouseActionTypes.MOUSE_WHEEL, props<{ elementId: string, wheel: number }>());

// двойной клик
export const MouseDouble = createAction(MouseActionTypes.MOUSE_DOUBLE, props<{ elementId: string }>());

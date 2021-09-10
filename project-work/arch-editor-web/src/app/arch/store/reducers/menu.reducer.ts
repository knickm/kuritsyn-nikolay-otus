import { Action, createReducer, on } from '@ngrx/store';
import { IMenuState } from '../states/menu.state';
import * as fromAction from '../actions/menu.action';

const initialState: IMenuState = {
	element: '',
};

const menuReducer = createReducer<IMenuState>(
	initialState,
	on(fromAction.MenuSelect, (state, { element }) => ({ element })),
);

export function reducer(state: IMenuState | undefined, action: Action) {
	return menuReducer(state, action);
}

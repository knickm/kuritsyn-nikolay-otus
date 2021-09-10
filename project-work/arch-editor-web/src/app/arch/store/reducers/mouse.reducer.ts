import { Action, createReducer, on } from '@ngrx/store';
import { IMouseState } from '../states/mouse.state';
import * as fromAction from '../actions/mouse.action';

const initialState: IMouseState = {
	elementId: '',
	action: 'none',
	position: null,
	movement: null,
	wheel: 0
};

const mouseReducer = createReducer<IMouseState>(
	initialState,
	on(fromAction.MouseDown, (state, { elementId }) => ({ ...state, action: 'down', elementId })),
	on(fromAction.MouseUp, (state, { elementId }) => ({ ...state, action: 'up', elementId })),
	on(fromAction.MouseOut, (state, { elementId }) => ({ ...state, action: 'out', elementId })),

	on(fromAction.MouseMove,
		(state, { elementId, position, movement }) => ({ ...state, action: 'move', elementId, position, movement })),

	on(fromAction.MouseWheel, (state, { elementId, wheel }) => ({ ...state, action: 'wheel', elementId, wheel })),
	on(fromAction.MouseDouble, (state, { elementId }) => ({ ...state, action: 'double', elementId })),
);

export function reducer(state: IMouseState | undefined, action: Action) {
	return mouseReducer(state, action);
}

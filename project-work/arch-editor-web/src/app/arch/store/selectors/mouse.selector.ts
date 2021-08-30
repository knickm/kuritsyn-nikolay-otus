import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMouseState } from '../states/mouse.state';

export const getMouseFeatureState = createFeatureSelector<IMouseState>('mouse');

export const getMouseState = createSelector(
	getMouseFeatureState,
	(state: IMouseState) => state
);

export const getMouseAction = createSelector(
	getMouseState,
	(state: IMouseState) => state.action
);

export const getMousePosition = createSelector(
	getMouseState,
	(state: IMouseState) => state.position
);

export const getMouseWheel = createSelector(
	getMouseState,
	(state: IMouseState) => state.wheel
);

export const getMouseElemntId = createSelector(
	getMouseState,
	(state: IMouseState) => state.elementId
);


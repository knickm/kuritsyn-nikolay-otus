import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMenuState } from '../states/menu.state';

export const getMenuFeatureState = createFeatureSelector<IMenuState>('menu');

export const getMenuState = createSelector(
	getMenuFeatureState,
	(state: IMenuState) => state
);

export const getMenuElement = createSelector(
	getMenuState,
	(state: IMenuState) => state.element
);


import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';

export interface ICoreState {
	notify: fromReducer.NotifyState;
	loading: fromReducer.LoadingState;
	theme: fromReducer.ThemeState;
}

export const coreReducers: ActionReducerMap<ICoreState> = {
	notify: fromReducer.notifyReducer,
	loading: fromReducer.loadingReducer,
	theme: fromReducer.themeReducer
};

export const getCoreState = createFeatureSelector<ICoreState>('core');

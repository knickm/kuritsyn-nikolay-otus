import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from '../reducers';

export interface ICoreState {
	notifyState: fromReducer.NotifyState;
	loadingState: fromReducer.LoadingState;
	themeState: fromReducer.ThemeState;
}

export const coreReducers: ActionReducerMap<ICoreState> = {
	notifyState: fromReducer.notifyReducer,
	loadingState: fromReducer.loadingReducer,
	themeState: fromReducer.themeReducer
};

export const getCoreState = createFeatureSelector<ICoreState>('core');

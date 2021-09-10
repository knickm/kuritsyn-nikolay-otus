import { InjectionToken } from '@angular/core';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';

import { IAppState } from '../states/router.state';

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<IAppState, Action>>('Root reducers token', {
	factory: () => ({
		router: routerReducer
	}),
});

// console.log all actions
export function logger(reducer: ActionReducer<IAppState>): ActionReducer<IAppState> {
	return (state: IAppState | undefined, action: Action): any => {
		const result = reducer(state, action);
		console.groupCollapsed(action.type);
		console.log('prev state', state);
		console.log('action', action);
		console.log('next state', result);
		console.groupEnd();
		return result;
	};
}

// /**
//  * By default, @ngrx/store uses combineReducers with the reducer map to compose
//  * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
//  * that will be composed to form the root meta-reducer.
//  */
export const metaReducers: MetaReducer<IAppState>[] = !environment.production
	? [logger]
	: [];

export * from './router.reducer';

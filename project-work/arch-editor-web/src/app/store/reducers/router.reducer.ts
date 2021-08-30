import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import { IAppState, IRouterStateUrl } from '../states/router.state';

export const reducers: ActionReducerMap<IAppState> = {
  router: fromRouter.routerReducer,
};

// tslint:disable-next-line: max-line-length
// export const getRouterState = createFeatureSelector<IAppState, fromRouter.RouterReducerState<IRouterStateUrl>>('router');
export const getRouterState = createFeatureSelector<IAppState>('router');
export const getRouter = createSelector(
  getRouterState,
  state => state.router
);
// export const getRouterState = (state: ActionReducerMap<IAppState>) => state.router;

export const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(getRouter);

export const selectRouteId = selectRouteParam('id');
export const selectStatus = selectQueryParam('status');

import { createSelector } from '@ngrx/store';

import { getCoreState, ICoreState } from '../state';
import { LoadingState } from '../reducers';

const getLoadingState = createSelector(
	getCoreState,
	(state: ICoreState) => state.loading
);

export const getLoading = createSelector(
	getLoadingState,
	(state: LoadingState) => state.loading
);

import { createSelector } from '@ngrx/store';

import { getCoreState } from '../state';
import { LoadingState } from '../reducers';


const getLoadingState = createSelector(
	getCoreState,
	state => state.loadingState
);

export const getLoading = createSelector(
	getLoadingState,
	(state: LoadingState) => state.loading
);

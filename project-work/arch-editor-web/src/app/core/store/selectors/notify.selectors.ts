import { createSelector } from '@ngrx/store';
import { getCoreState, ICoreState } from '../state';
import { NotifyState } from '../reducers';

const getNotifyState = createSelector(
	getCoreState,
	(state: ICoreState) => state.notifyState
);

export const getMessage = createSelector(
	getNotifyState,
	(state: NotifyState) => state.message
);

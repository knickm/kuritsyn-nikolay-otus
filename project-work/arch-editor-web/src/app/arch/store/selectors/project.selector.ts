import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProjectState } from '../states/project.state';

export const getProjectFeatureState = createFeatureSelector<IProjectState>('project');

export const getProjectState = createSelector(
	getProjectFeatureState,
	(state: IProjectState) => state
);

export const getProject = createSelector(
	getProjectState,
	(state: IProjectState) => state.project
);

export const getProjectList = createSelector(
	getProjectState,
	(state: IProjectState) => state.list
);

export const getProjectError = createSelector(
	getProjectState,
	(state: IProjectState) => state.error
);

export const getProjectMessage = createSelector(
	getProjectState,
	(state: IProjectState) => state.message
);

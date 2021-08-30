import { createAction, props } from '@ngrx/store';
import { IResponseMessage } from 'src/app/core/interfaces';
import { IProject } from '../../models/project';

enum ProjectActionTypes {
	PROJECT_OPEN = '[Project] Open',
	PROJECT_SAVE = '[Project] Save',
	PROJECT_LOAD_LIST = '[Project] Load list',

	PROJECT_SUCCESS = '[Project] Project success',
	PROJECT_FAIL = '[Project] Project error',
}

export const Open = createAction(ProjectActionTypes.PROJECT_OPEN, props<{ id: number }>());
export const LoadList = createAction(ProjectActionTypes.PROJECT_LOAD_LIST);

export const OpenSuccess = createAction(ProjectActionTypes.PROJECT_SUCCESS, props<IProject>());
export const LoadSuccess = createAction(ProjectActionTypes.PROJECT_SUCCESS, props<{ list: Array<IProject> }>());
export const Fail = createAction(ProjectActionTypes.PROJECT_FAIL, props<IResponseMessage>());

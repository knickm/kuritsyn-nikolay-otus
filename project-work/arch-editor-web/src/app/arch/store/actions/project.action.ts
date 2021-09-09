import { createAction, props } from '@ngrx/store';
import { IResponseMessage } from 'src/app/core/interfaces';
import { IProject } from '../../models/project';

enum ProjectActionTypes {
	PROJECT_OPEN = '[Project] Open',
	PROJECT_OPEN_SUCCESS = '[Project] Project open success',

	PROJECT_SAVE = '[Project] Save',
	PROJECT_SAVE_SUCCESS = '[Project] Project save success',

	PROJECT_LOAD_LIST = '[Project] Load list',
	PROJECT_LOAD_SUCCESS = '[Project] Project load success',

	PROJECT_FAIL = '[Project] Project error',
}

export const Open = createAction(ProjectActionTypes.PROJECT_OPEN, props<{ id: number }>());
export const OpenSuccess = createAction(ProjectActionTypes.PROJECT_OPEN_SUCCESS, props<IProject>());

export const LoadList = createAction(ProjectActionTypes.PROJECT_LOAD_LIST);
export const LoadSuccess = createAction(ProjectActionTypes.PROJECT_LOAD_SUCCESS, props<{ list: Array<IProject> }>());

export const Save = createAction(ProjectActionTypes.PROJECT_SAVE, props<IProject>());
export const SaveSuccess = createAction(ProjectActionTypes.PROJECT_SAVE_SUCCESS, props<{ id: number }>());

export const Fail = createAction(ProjectActionTypes.PROJECT_FAIL, props<IResponseMessage>());

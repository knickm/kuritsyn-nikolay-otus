import { Action, createReducer, on } from '@ngrx/store';

import * as fromAction from '../actions/project.action';
import { IProjectState } from '../states/project.state';

const initialState: IProjectState = {
	project: null,
	list: [],
	error: null,
	message: null
};

const projectReducer = createReducer<IProjectState>(
	initialState,
	on(fromAction.Open, (state) => ({ ...state, project: null, error: null, message: null })),
	on(fromAction.OpenSuccess, (state, project) => ({ ...state, project })),

	on(fromAction.LoadList, (state) => ({ ...state, project: null, error: null, message: null })),
	on(fromAction.LoadSuccess, (state, { list }) => ({ ...state, list })),

	on(fromAction.Save, (state, project) => ({ ...state, project, error: null, message: null })),
	on(fromAction.SaveSuccess, (state, p) => {
		const project = { ...state.project! };
		project.id = p.id;
		return { ...state, project };
	}),

	on(fromAction.Fail, (state, error) => ({ ...state, error })),
);

export function reducer(state: IProjectState | undefined, action: Action) {
	return projectReducer(state, action);
}

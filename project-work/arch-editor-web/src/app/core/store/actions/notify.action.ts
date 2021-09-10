import { createAction, props } from '@ngrx/store';

export enum NotifyActionTypes {
	SHOW = '[Notify] Show message'
}

export const ShowNotify = createAction(NotifyActionTypes.SHOW, props<{ message: string }>());

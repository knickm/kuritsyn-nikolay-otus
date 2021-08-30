import { IResponseMessage } from 'src/app/core/interfaces';
import { IProject } from '../../models/project';

export interface IProjectState {
	project: IProject | null;
	list: Array<IProject>;
	error: IResponseMessage | null;
	message: string | IResponseMessage | null;
}

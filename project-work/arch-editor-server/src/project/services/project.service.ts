import { Injectable } from '@nestjs/common';
import { IResponseMessage } from 'src/core/models';
import { IProject } from 'src/core/models/project';

const PROJECT_LIST: { [key: number]: IProject } = [];

@Injectable()
export class ProjectService {

	list(): Array<IProject> {
		return Object.values(PROJECT_LIST);
	}

	find(id: number): IProject | undefined {
		return PROJECT_LIST[id]
	}

	create(project: IProject): number {
		const id = project.id || Object.keys(PROJECT_LIST).length;
		PROJECT_LIST[id] = project;
		project.id = id;
		return id;
	}
}

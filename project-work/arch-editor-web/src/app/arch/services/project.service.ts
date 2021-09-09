import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config.service';
import { IResponseMessage } from 'src/app/core/interfaces';

import { CommonService } from 'src/app/core/services/common.service';
import { IProject } from '../models/project';

@Injectable()
export class ProjectService extends CommonService<Array<IProject>, Array<IProject>> {
	protected action = 'projects';

	constructor(config: AppConfig, http: HttpClient) {
		super(config, http);
	}

	protected extractData(value: Array<IProject>, _: number): Array<IProject> {
		return value;
	}

	protected checkResponse(value: IResponseMessage, __: number): Array<IProject> {
		return [];
	}

	open(id: number): Observable<Array<IProject>> {
		return this.getData(id.toString());
	}

	load(): Observable<Array<IProject>> {
		return this.getData();
	}

	save(project: IProject): Observable<number | IProject[]> {
		return this.sendData(project)
	}
}

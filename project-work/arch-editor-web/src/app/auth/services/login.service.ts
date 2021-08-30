import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from 'src/app/config/config.service';
import { CommonService } from 'src/app/core/services/common.service';
import { IUser, User } from 'src/app/core/models/user';

@Injectable()
export class LoginService extends CommonService<IUser, User | null> {
	protected action = 'auth';

	constructor(config: AppConfig, http: HttpClient) {
		super(config, http);
	}

	protected extractData(value: IUser, _: number): User | null {
		if (value) {
			return new User(value);
		}
		return null;
	}

	protected checkResponse(value: IUser, __: number): User | null {
		if (value) {
			return new User(value);
		}
		return null;
	}
}

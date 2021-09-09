import { b64EncodeUnicode } from "../util/base64";

/**
 * Параметры формы авторизации. (Login form)
 */
export interface IAuthParams {
	login: string;
	password: string;
}

/**
 * Данные пользователя
 */
export interface IUser {
	id: number;
	login: string;
}


export class User implements IUser {
	id: number;
	login: string;

	constructor(u: IUser) {
		this.id = u.id;
		this.login = u.login;
	}
}

export const basicCredentials = (authParams: IAuthParams) => 'Basic ' + b64EncodeUnicode(authParams.login + ':' + authParams.password);

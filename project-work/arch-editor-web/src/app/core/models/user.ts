import { b64EncodeUnicode } from "../util/base64";
import { UserRole } from "./role";

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
	uuid: string;
	email: string;
	role: UserRole;
}

export class User implements IUser {
	uuid: string;
	email: string;
	role: UserRole;

	constructor(u: IUser) {
		this.uuid = u.uuid;
		this.email = u.email;
		this.role = u.role;
	}

	CanEdit(): boolean {
		return this.role === UserRole.secretary;
	}
}

export const basicCredentials = (authParams: IAuthParams) => 'Basic ' + b64EncodeUnicode(authParams.login + ':' + authParams.password);

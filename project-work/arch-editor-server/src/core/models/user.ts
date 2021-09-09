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
	password: string;
}

export const basicCredentials = (authParams: IAuthParams) =>
	'Basic ' + b64EncodeUnicode(authParams.login + ':' + authParams.password);

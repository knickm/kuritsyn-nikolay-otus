import {
	HttpClient,
	HttpParams,
	HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, ObservableInput, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/config.service';

export interface ICommonService {
	/**
	 * Инициирует GET запорс
	 */
	getData(
		parturl?: string,
		params?: HttpParams | { [param: string]: string | string[] }
	): Observable<any>;

	/**
	 * Инициирует DELETE запорс
	 */
	delete(
		parturl?: string,
		params?: HttpParams | { [param: string]: string | string[] }
	): Observable<any>;

	/**
	 * Инициирует POST процес отправления данных на сервер
	 * @param params: string необязательный параметр, представляет собой строку
	 * с дополнительными параметрами при обращении к сервису
	 */
	sendData(body: any | null, url?: string, options?: any): Observable<any>;
}

/**
 * Абстрактный класс. Является базовым для сервисов получающих данные от бэкенда.
 * U - тип данных получаемых от сервера
 * T - тип данных возвращаемых сервисом
 */
export abstract class CommonService<U, T> {
	/**
	 * Должен определяться в дочерних классах
	 */
	protected action: string = '';

	constructor(private config: AppConfig, private http: HttpClient) {
	}

	/**
	 * Инициирует процес получения данных
	 * @param params: string необязательный параметр, представляет собой строку
	 * с дополнительными параметрами при обращении к сервису
	 */
	getData<TT>(
		parturl?: string,
		params?: HttpParams | { [param: string]: string | string[] }
	): Observable<T | TT> {
		const options: { [key: string]: any } = {};
		if (params) {
			options.params = params;
		}

		return (this.http.get(this.getUrl(parturl), options) as Observable<U>).pipe(
			map(this.extractData),
			catchError(this.handleError)
		);
	}

	/**
	 * Инициирует процес удаления данных
	 * @param params: string необязательный параметр, представляет собой строку
	 * с дополнительными параметрами при обращении к сервису
	 */
	_delete<TT>(
		parturl?: string,
		params?: HttpParams | { [param: string]: string | string[] }
	): Observable<TT | T> {
		const options: { [key: string]: any } = {};
		if (params) {
			options.params = params;
		}
		return this.http.delete(this.getUrl(parturl), options).pipe(
			map(this.extractMessage),
			catchError(this.handleError)
		);
	}

	/**
	 * Инициирует процес отправления данных на сервер
	 * @param params: string необязательный параметр, представляет собой строку
	 * с дополнительными параметрами при обращении к сервису
	 */
	sendData<TT>(body: any | null, url?: string, options?: { [key: string]: any }): Observable<T | TT> {
		if (!options) {
			options = {};
		}
		options.withCredentials = true;

		return this.http.post(this.getUrl(url), body, options).pipe(
			map(this.checkResponse),
			catchError(this.handleError)
		);
	}

	/**
	 * формирует URL запроса к сервису
	 */
	private getUrl(params?: string): string {
		const cData = this.config;
		if (cData === null) {
			throw new Error("Cannot load config");
		}
		const url: string = [cData.endPoint, this.action].join('/') + '/' + (params || '');
		return url;
	}

	/**
	 * Извлекает данные из ответа от сервиса.
	 * Абстрактный метод. Должен быть переопределен в дочернем классе.
	 *
	 */
	protected abstract extractData(value: U, index: number): T;

	/**
	 * Извлекает данные из ответа от сервиса после удаления записи.
	 */
	protected extractMessage(value: object, index: number): object {
		return value;
	}

	/**
	 * Проверяет ответ сервиса после отправки данных.
	 * Абстрактный метод. Должен быть переопределен в дочернем классе.
	 *
	 */
	protected abstract checkResponse(value: object, index: number): T;

	/**
	 * Обработчик ошибок
	 * ```
	 * todo:
	 * в продакшен сделать вывод на экран
	 * ```
	 */
	private handleError(error: HttpErrorResponse, f: any): ObservableInput<any> {
		const err = {
			error: 'SERVICE.serverError' // 'Произошла ошибка на сервере. Попробуйте позже.'
		};

		if (error && error.error && error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error ? error.status : 'undefined'}, ` + `body was:`, error
			);
			if (error && error.error && error.error.message) {
				err.error = error.error.message;
			}
		}
		// return an ErrorObservable with a user-facing error message
		return throwError(err);
		// 'Something bad happened; please try again later.');
	}
}

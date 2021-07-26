import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';

import { AppConfig } from 'src/app/config/config.service';
import { catchError, map } from 'rxjs/operators';
import { ResponseError, ResponseOk } from '../models/word-translate';

@Injectable()
export class TranslateService {

	constructor(private config: AppConfig, private http: HttpClient) {
	}

	/**
	 * Инициирует процес отправления данных на сервер
	 * @param params: string необязательный параметр, представляет собой строку
	 * с дополнительными параметрами при обращении к сервису
	 */
	sendData(body: any | null, url?: string, options?: { [key: string]: any }): Observable<ResponseOk> {
		if (!options) {
			options = {};
		}
		options.withCredentials = true;

		return this.http.post(this.getUrl(url), body, options).pipe(
			map((v: any) => {
				if (v["error"]) {
					throwError(v as ResponseError);
				}
				return v as ResponseOk;
			}),
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

		const chunks = [cData.endPoint];
		if (cData.pathPrefix1) {
			chunks.push(cData.pathPrefix1);
		}
		if (params) {
			chunks.push(params);
		}
		if (cData.pathPrefix2) {
			chunks.push(cData.pathPrefix2);
		}

		return chunks.join('/');
	}

	/**
	 * Обработчик ошибок
	 */
	private handleError(error: HttpErrorResponse, f: any): ObservableInput<any> {
		const err = {
			error: 'Произошла ошибка на сервере. Попробуйте позже.'
		};

		if (error && error.error && error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			console.error(
				`Backend returned code ${error ? error.status : 'undefined'}, ` + `body was:`, error
			);
			if (error && error.error && error.error.message) {
				err.error = error.error.message;
			}
		}
		return throwError(err);
	}
}
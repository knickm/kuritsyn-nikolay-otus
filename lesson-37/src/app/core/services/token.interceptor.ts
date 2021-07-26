import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config.service';
import { b64EncodeUnicode } from '../util/base64';
import { SettingsService } from './settings.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private config: AppConfig, private settngs: SettingsService) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// console.log(request.url, ', pathPrefix1:::', this.config.pathPrefix1);
		if (!this.config.pathPrefix1 || request.url.match('config') || !request.url.match(this.config.pathPrefix1)) {
			return next.handle(request);
		}

		const s = this.settngs.GetSettings();
		if (s !== null) {
			const user = this.config.appParams["user"].replace('${apikey}', s.apiKey);
			console.log(user);
			const user64 = b64EncodeUnicode(user)
			request = request.clone({
				setHeaders: {
					Authorization: `Basic ${user64}`
				}
			});
		}
		return next.handle(request);
	};
}


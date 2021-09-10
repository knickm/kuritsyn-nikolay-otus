import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config.service';
import { b64EncodeUnicode } from '../util/base64';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private config: AppConfig) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!request.url.match(this.config.pathPrefix)) {
			return next.handle(request);
		}

		const user64 = b64EncodeUnicode(this.config.appParams["user"])
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${user64}`
			}
		});
		return next.handle(request);
	};
}


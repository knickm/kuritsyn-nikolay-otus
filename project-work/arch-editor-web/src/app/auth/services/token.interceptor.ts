import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AppConfig } from 'src/app/config/config.service';
import { first, mergeMap } from 'rxjs/operators';
import { basicCredentials } from 'src/app/core/models/user';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService, private config: AppConfig) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (!this.config.pathPrefix || !request.url.match(this.config.pathPrefix)) {
			return next.handle(request);
		}

		return this.auth.isAuthenticated().pipe(
			first(),
			mergeMap(params => {
				if (params) {
					request = request.clone({
						setHeaders: {
							Authorization: basicCredentials(params)
						}
					});
				}
				return next.handle(request);
			}),
		);
	}
}

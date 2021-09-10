import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap, filter } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, public router: Router) { }

	/**
	 * CanActivate - разрешает/запрещает доступ к маршруту;
	 * @param route 
	 * @param state 
	 */
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		return this.authService.isAuthenticated().pipe(
			map(v => {
				if (v) {
					return true;
				}
				this.router.navigate(['auth']);
				return false;
			})
		);
	}
}
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from './settings.service';

@Injectable()
export class SettingsGuard implements CanActivate {

	constructor(private settings: SettingsService, public router: Router) { }

	/**
	 * CanActivate - разрешает/запрещает доступ к маршруту;
	 * @param route 
	 * @param state 
	 */
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
		const s = this.settings.GetSettings();
		if ( s !== null && !!s.apiKey && !!s.urlKey) {
			return true;
		}
		alert("Сначала настройте приложение.");
		this.router.navigate(['settings']);
		return false;
	}
}
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as fromCoreStore from 'src/app/core/store';

@Component({
	selector: 'app-home',
	host: { class: 'flex-column flex-grow-100 justify-center' },
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	get isAuth$(): Observable<boolean> {
		return this.authService.isAuthenticated().pipe(
			map(v => v !== null)
		);
	}

	constructor(
		private authService: AuthService,
	) {
	}

	ngOnInit(): void {
	}

}

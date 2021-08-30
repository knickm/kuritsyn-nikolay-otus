import { Component, ChangeDetectionStrategy, Renderer2, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/config.service';

import * as fromCoreStore from 'src/app/core/store';
import * as fromAuthStore from 'src/app/auth/store';

const $5m = 5 * 60 * 1000; // 5 минут
@Component({
	selector: 'app-core',
	template: `
	<div class="flex-column justify-between core">
		<app-header [User]="user$|async"></app-header>
		<router-outlet style="display:none"></router-outlet>
		<app-footer-view></app-footer-view>
	</div>`,
	styles: ['.core{min-height:100vh}'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnDestroy {
	private unsubscribe$ = new Subject();

	loading$ = this.coreStore.pipe(select(fromCoreStore.getLoading));
	user$ = this.coreStore.pipe(select(fromAuthStore.getAuthUser));

	constructor(
		private config: AppConfig,
		private coreStore: Store<fromCoreStore.ICoreState>,
		private renderer: Renderer2,
	) {
	}

	ngOnInit() {
		this.coreStore.pipe(select(fromCoreStore.getTheme), takeUntil(this.unsubscribe$))
			.subscribe(theme => {
				if (!theme) {
					theme = this.config.themeList[0].code;
					this.coreStore.dispatch(fromCoreStore.SetTheme({ code: theme }));
				}
				this.renderer.setAttribute(document.body, 'class', '');
				this.renderer.addClass(document.body, theme);
			});

		this.coreStore.dispatch(fromCoreStore.InitTheme());
		if (this.config.appParams['underConstruction']) {
			timer(2000, $5m)
				.subscribe(() => this.coreStore.dispatch(fromCoreStore.ShowNotify({ message: 'Сайт работает в тестовом режиме' })));
		}
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

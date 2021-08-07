import { Component, ChangeDetectionStrategy, Renderer2, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConfig } from 'src/app/config/config.service';

import * as fromCoreStore from 'src/app/core/store';

@Component({
	selector: 'app-core',
	template: `
	<div class="flex-column justify-between core">
		<app-header></app-header>
		<router-outlet style="display:none"></router-outlet>
		<app-footer-view></app-footer-view>
	</div>`,
	styles: ['.core{min-height:100vh}'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements OnDestroy {
	private unsubscribe$ = new Subject();

	loading$ = this.coreStore.pipe(select(fromCoreStore.getLoading));

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
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

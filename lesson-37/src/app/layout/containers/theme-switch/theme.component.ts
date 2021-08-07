import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCoreStore from 'src/app/core/store';

@Component({
	selector: 'app-theme-switch',
	template: `<app-theme-switch-view
			[theme] = "changeTheme$ | async"
			(submitted)="onSubmit($event)"></app-theme-switch-view>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent {
	changeTheme$ = this.store.pipe(select(fromCoreStore.getTheme));

	constructor(private store: Store<fromCoreStore.ICoreState>) { }

	onSubmit(code: string) {
		this.store.dispatch(fromCoreStore.SetTheme({ code }));
	}
}

import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromNotifyStore from 'src/app/core/store/selectors';
import { NotifyState } from 'src/app/core/store';

@Component({
	selector: 'app-notify',
	template: `
    <app-notify-view
        [message] = "message$ | async"
    ></app-notify-view>
    `
})
export class NotifyComponent {
	message$ = this.store.pipe(select(fromNotifyStore.getMessage));

	constructor(private store: Store<NotifyState>) { }
}

import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from 'src/app/core/interfaces/top-menu';

const ACTIONS: { [key: string]: { [key: string]: (router: Router) => void } } = {
	'file': {
		'new': (router: Router) => {
			router.navigateByUrl('/project');
		},
		'open': (router: Router) => {
			router.navigateByUrl('/project/1');
		}
	}
};

@Component({
	selector: 'app-top-menu-item-view',
	templateUrl: './top-menu-item-view.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuItemViewComponent {
	@ViewChild('subItems', { static: true }) public subItems: any;

	@Input()
	menuItems: IMenu[] = [];

	@Output()
	submitted = new EventEmitter<string>();

	constructor(private router: Router) { }

	onClick(event$: string | undefined) {
		console.log('onClick:', event$);
		if (event$) {
			const [group, action] = event$.split('.');
			const a = ACTIONS[group][action];
			if (a !== undefined) {
				a(this.router);
			}
		}
	}
}

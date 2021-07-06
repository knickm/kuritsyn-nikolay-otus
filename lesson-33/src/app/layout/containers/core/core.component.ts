import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-core',
	template: `
	<div class="flex-column">
		<app-header (onAction)="actionHandler($event)"></app-header>
		<div class="flex-column main">
			<app-home *ngIf="selected === 'Home'"></app-home>
			<app-recently-added *ngIf="selected === 'RecentlyAdded'"></app-recently-added>
			<app-go *ngIf="selected === 'Go'"></app-go>
			<app-settings *ngIf="selected === 'Settings'"></app-settings>
		</div>
		<app-footer-view></app-footer-view>
	</div>`,
	styles: ['.main{min-height:calc(100vh - 64px - 64px)}'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {
	selected = 'Home';
	constructor() { }

	actionHandler(action: string) {
		console.log('ACTION:::', action);
		this.selected = action;
	}
}

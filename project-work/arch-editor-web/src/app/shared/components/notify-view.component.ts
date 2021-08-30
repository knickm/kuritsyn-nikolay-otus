import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-notify-view',
	template: `
    <span class="warning" *ngIf="message">
    {{ message }}
    </span>
	`
})
export class NotifyViewComponent {
	@Input()
	message: string | null = '';
}

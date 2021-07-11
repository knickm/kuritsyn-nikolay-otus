import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-lang-switch',
	template: `<app-lang-switch-view></app-lang-switch-view>`,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangComponent {
	constructor() { }
}

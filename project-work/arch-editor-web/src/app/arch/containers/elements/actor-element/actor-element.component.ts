import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonElementComponent } from '../common-element.component';

@Component({
	selector: 'svg:g[app-actor-element]',
	templateUrl: './actor-element.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorElementComponent extends CommonElementComponent {
	protected init(): void {
		this.options.width = 50;
		this.options.height = 100;
		this.options.name ||= 'Actor';
		this.options.elementType = 'actor';
	}
}

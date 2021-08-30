import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonElementComponent } from '../common-element.component';

@Component({
	selector: 'app-actor-element',
	templateUrl: './actor-element.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorElementComponent extends CommonElementComponent implements OnInit {
	ngOnInit() {
		super.ngOnInit();
	}
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';

@Component({
	selector: 'app-actor',
	templateUrl: './actor.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActorComponent extends ShapeComponent {
}

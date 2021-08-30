import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';

@Component({
	selector: 'app-rectangle',
	templateUrl: './rectangle.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RectangleComponent extends ShapeComponent {
}

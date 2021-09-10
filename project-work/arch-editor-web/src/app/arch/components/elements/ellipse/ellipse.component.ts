import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShapeComponent } from '../shape/shape.component';

@Component({
	selector: '[appEllipse]',
	templateUrl: './ellipse.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EllipseComponent extends ShapeComponent {
}

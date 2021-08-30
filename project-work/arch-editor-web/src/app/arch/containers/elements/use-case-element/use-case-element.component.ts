import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonElementComponent } from '../common-element.component';

@Component({
	selector: 'app-use-case-element',
	templateUrl: './use-case-element.component.html',
	styleUrls: ['./use-case-element.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseElementComponent extends CommonElementComponent {
}

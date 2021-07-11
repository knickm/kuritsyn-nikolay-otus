import { Component, ChangeDetectionStrategy } from '@angular/core';
import { today } from 'src/app/core/util/date';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
	selector: 'app-footer-view',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterViewComponent {
	readonly faCopyright = faCopyright;

	private today = today();

	get Year(): number {
		return this.today.getFullYear();
	}

	constructor() { }
}

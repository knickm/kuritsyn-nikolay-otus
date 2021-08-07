import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-confirm-view',
	templateUrl: './confirm-view.component.html',
	styleUrls: ['./confirm-view.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ConfirmViewComponent {
	@Input()
	Message = '';

	@Input()
	btnYES = 'ДА';

	@Input()
	btnNO = 'НЕТ';

	@Output()
	confirmSubmit = new EventEmitter<boolean>();

	constructor() { }

	onOkClick(): void {
		this.confirmSubmit.emit(true);
	}

	onNoClick(): void {
		this.confirmSubmit.emit(false);
	}
}

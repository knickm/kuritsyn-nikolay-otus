import { Component, Inject, HostBinding, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-message-window',
	host: { class: 'flex-column flex-grow-100' },
	templateUrl: './message-window.component.html',
	styleUrls: ['./message-window.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MessageWindowComponent {
	Error = '';
	Message = '';
	Warning = '';
	Type = '';

	@HostBinding('class.main-win') _clsWin = true;

	constructor(
		public dialogRef: MatDialogRef<MessageWindowComponent>,
		@Inject(MAT_DIALOG_DATA) data: any
	) {
		if (data) {
			this.Error = data.error;
			this.Message = data.message;
			this.Warning = data.warning;
			this.Type = data.type;
		}
	}

	onOkClick(): void {
		this.dialogRef.close(true);
	}

	onNoClick(): void {
		this.dialogRef.close(false);
	}
}

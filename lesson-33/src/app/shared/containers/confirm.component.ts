import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-confirm',
	template: `
    <app-confirm-view
      [Message] = "Message"
      [btnYES] = "btnYES"
      [btnNO] = "btnNO"
      (confirmSubmit)="onConfirm($event)"
    ></app-confirm-view>`
})
export class ConfirmComponent {
	Message = '';
	btnYES = 'ДА';
	btnNO = 'НЕТ';

	constructor(
		public dialogRef: MatDialogRef<ConfirmComponent>,
		@Inject(MAT_DIALOG_DATA) data: any,
	) {
		if (data) {
			this.Message = data.Message;
			if (data.btnYES) {
				this.btnYES = data.btnYES;
			}
			if (data.btnNO) {
				this.btnNO = data.btnNO;
			}
		}
	}

	onConfirm($event: boolean) {
		this.dialogRef.close($event);
	}
}

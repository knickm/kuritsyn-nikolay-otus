import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { MatCommonModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatCommonModule } from '../../mat.common.module';

import { MessageWindowComponent } from './message-window.component';

describe('MessageWindowComponent', () => {
	let component: MessageWindowComponent;
	let fixture: ComponentFixture<MessageWindowComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [
				HttpTestingController,
				{
					provide: MatDialogRef,
					useValue: {}
				},
				{
					provide: MAT_DIALOG_DATA,
					useValue: {}
				},

			],
			imports: [
				MatCommonModule,
				HttpClientTestingModule,
			],
			declarations: [MessageWindowComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageWindowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

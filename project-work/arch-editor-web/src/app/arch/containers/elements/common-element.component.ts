import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';

import * as fromStore from '../../store';

@Component({
	host: {
		'[style.position]': "'absolute'",
		'[style.display]': "'block'",
		'[style.left]': "left+'px'",
		'[style.top]': "top+'px'"
	},
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class CommonElementComponent implements OnInit {

	@Input()
	id = 0;

	@Input()
	selected = false;

	@Input()
	left = 0;

	@Input()
	top = 0;

	@Input()
	width = 100;

	@Input()
	height = 100;

	constructor(
		public cdRef: ChangeDetectorRef,
		protected elRef: ElementRef,
		private storeMouse: Store<fromStore.mouseState.IMouseState>
	) { }

	ngOnInit(): void {
		this.elRef.nativeElement.setAttribute('style', `position:absolute;display:block;left:${this.left}px;top:${this.top}px;`);

		this.storeMouse.pipe(
			select(fromStore.mouseSelector.getMouseState),
			tap(e => console.log(e)),
			filter(e => e.action === 'down')
		).subscribe(e => {
			this.selected = e.elementId === 'usecase_' + this.id;
			this.cdRef.detectChanges();
			console.log(this.selected);
		});

		this.init();
		this.cdRef.detectChanges();
	}

	protected init(): void {

	}

	onResize(event: any) {

	}
}

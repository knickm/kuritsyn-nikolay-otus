import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ElementRef } from '@angular/core';

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
	left = 0;

	@Input()
	top = 0;

	constructor(
		public cdRef: ChangeDetectorRef,
		protected elRef: ElementRef
	) { }

	ngOnInit(): void {
		console.log(this.elRef.nativeElement.getAttribute('style'));
		this.elRef.nativeElement.setAttribute('style',`position:absolute;display:block;left:${this.left}px;top:${this.top}px;`);
		console.log(this.elRef.nativeElement.getAttribute('style'));

		this.init();
		this.cdRef.detectChanges();
	}

	protected init(): void {

	}
}

import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	Sanitizer,
	SecurityContext,
	SimpleChanges
} from '@angular/core';

// Sets the element's innerHTML to a sanitized version of [safeHtml]
@Directive({
	selector: '[appSafeHtml]'
})
export class SafeHtmlDirective implements OnChanges {

	@Input()
	appSafeHtml: string = '';

	constructor(private elementRef: ElementRef, private sanitizer: Sanitizer) { }

	ngOnChanges(changes: SimpleChanges): any {
		if ('appSafeHtml' in changes) {
			this.elementRef.nativeElement.innerHTML = this.sanitizer.sanitize(
				SecurityContext.HTML,
				this.appSafeHtml
			);
		}
	}
}

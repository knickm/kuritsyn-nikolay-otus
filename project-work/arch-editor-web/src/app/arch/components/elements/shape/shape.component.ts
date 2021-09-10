import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	host: {
		'[style.pointer-events]': "'bounding-box'"
		// 	// class: 'flex-row',
		// 	'[style.width]': 'width+"px"',
		// 	'[style.height]': 'height+"px"'
	},
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class ShapeComponent {

	@Input()
	x = 0;

	@Input()
	y = 0;

	@Input()
	width = 200;

	@Input()
	height = 100;

	@Input()
	WithAnchors = false;

	@Input()
	text = '';

	constructor() { }
}

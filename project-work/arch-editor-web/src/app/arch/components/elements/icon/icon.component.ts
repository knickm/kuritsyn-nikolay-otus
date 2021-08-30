import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-icon',
	// host: {
	// 	class: 'flex-col justify-center align-center'
	// },
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {

	@Input()
	selected = false;

	@Input()
	Shape?: 'rectangle' | 'ellipse' | 'actor';

	@Input()
	Text = '';

	@Input()
	HAlign: 'left' | 'center' | 'right' = 'center';

	@Input()
	VAlign: 'top' | 'center' | 'bottom' = 'center';

	@Output()
	onSelect = new EventEmitter<void>();

	constructor() { }

	ngOnInit(): void {
	}

	select() {
		this.onSelect.emit();
	}
}

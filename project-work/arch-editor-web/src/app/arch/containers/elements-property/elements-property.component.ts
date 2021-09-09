import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-elements-property',
	host: {
		class: 'flex-column p-4'
	},
	templateUrl: './elements-property.component.html',
	styleUrls: ['./elements-property.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementsPropertyComponent implements OnInit {

	@Input()
	name = '';

	@Input()
	description = '';

	@Output()
	onName = new EventEmitter<string>();

	@Output()
	onDescription = new EventEmitter<string>();

	constructor() { }

	ngOnInit(): void {
	}

	onChangeName(v: string) {
		this.onName.emit(v.toString());
	}
	onChangeDescription(v: string) {
		this.onDescription.emit(v.toString());
	}
}

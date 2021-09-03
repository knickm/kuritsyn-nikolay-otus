import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnchorType } from 'src/app/arch/models/interfaces';
import { IPoint } from 'src/app/arch/models/point';

@Component({
	selector: '[appAnchor]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        
            <svg:rect [attr.x]="Position.x" [attr.y]="Position.y" [attr.width]="10" [attr.height]="10" [attr.fill]="'black'" />
        
    `
})
export class AnchorComponent implements OnInit {

	@Input()
	appAnchor!: string;

	@Input()
	Position!: IPoint;

	@Input()
	Type!: AnchorType;

	constructor() { }

	ngOnInit(): void {
	}

}

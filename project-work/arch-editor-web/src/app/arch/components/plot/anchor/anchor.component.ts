import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import * as fromStore from '../../../store';
import { Point } from 'src/app/arch/models/point';

export type TAType = 'ne' | 'nw' | 'se' | 'sw';
const WIDTH = 10;
const HALF_WIDTH = WIDTH / 2;

@Component({
	selector: '[appAnchor]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
        <svg:g>
            <svg:rect [attr.x]="Position.x" [attr.y]="Position.y" [attr.width]="10" [attr.height]="10" [attr.fill]="'black'" />
        </svg:g>
    `
})
export class AnchorComponent implements OnInit, OnDestroy {
	private _mouseMode: 'up' | 'down' | 'out' | 'double' | 'none' = 'none';

	@Output()
	submitedResize = new EventEmitter<{ p: Point; t: TAType; mp?: Point }>();

	@Input() appAnchor!: string;

	@Input()
	Type: TAType = 'ne';

	// private _mousePos: Point = new Point(MARGIN_LEFT, MARGIN_TOP);
	@Input()
	set MousePosition(v: Point) {
		this._mousePos = new Point(v);
	}
	private _mousePos: Point = new Point(0, 0);

	Width = WIDTH;

	@Input()
	set Position(p: Point) {
		// console.log('ANCH SET POS:', p.x);
		this._position = new Point(p.sub(HALF_WIDTH));
		// this._mousePos = new Point(this._position);
	}
	get Position(): Point {
		return this._position;
	}
	_position: Point = new Point(0, 0);

	constructor(
		// private store: Store<fromStore.GardenState>,
		private cdRef: ChangeDetectorRef
	) {
	}

	ngOnInit() {
	}

	ngOnDestroy() {
	}

	onDrag(p: Point) {
		this._position.add(p);
		this.submitedResize.emit({
			p: p,
			t: this.Type,
			mp: this._mousePos
		});
		this.cdRef.detectChanges();
	}

	onMove(p: Point) {
		if (p !== null) {
			// console.log('MOUSE MOVE', `old=${this._mousePos.x}, new=${p.x}`);
			if (this._mouseMode === 'down') {
				this.onDrag(new Point(p.x - this._mousePos.x, p.y - this._mousePos.y));
			}
			this._mousePos = new Point(p.x, p.y);
		}
	}
}

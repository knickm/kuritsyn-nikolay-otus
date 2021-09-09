import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CommonUMLType } from 'src/app/arch/models/interfaces';
import { IPoint } from 'src/app/arch/models/point';

@Component({
	selector: 'svg:g[appArrow]',
	templateUrl: './arrow.component.html',
	styleUrls: ['./arrow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowComponent implements OnInit {

	@Input()
	elementId = 0;

	@Input()
	pathPoints: Array<IPoint> = [];

	@Input()
	from: CommonUMLType | null = null;

	@Input()
	to: CommonUMLType | null = null;

	get path(): string {
		return 'M' + this.pathPoints.map(p => p.x + ' ' + p.y).join('L');
	}

	constructor(
		private cdRef: ChangeDetectorRef
	) { }

	ngOnInit(): void {
	}

	recalcPath(cx: number, cy: number, width: number, height: number) {
		if (this.pathPoints.length < 2) {
			return;
		}

		const w2 = width / 2;
		const h2 = height / 2;
		const endPoint = this.pathPoints[this.pathPoints.length - 1];
		const endX = endPoint.x;
		const endY = endPoint.y;
		const startPoint = this.pathPoints[0];
		// const startX = startPoint.x;
		// const startY = startPoint.y;
		startPoint.x = endX > cx ? cx + w2 : cx - w2;
		startPoint.y = endY > cy ? cy + h2 : cy - h2;
	}

	setEnd(p: IPoint, add = false) {
		if (add) {
			this.pathPoints.push({ ...p });
		} else {
			this.pathPoints[this.pathPoints.length - 1] = { ...p };
		}
		if (this.from) {
			this.recalcPath(this.from.cx, this.from.cy, this.from.width, this.from.height);
		}
		console.log('pathPoints:::', this.pathPoints);
		this.cdRef.markForCheck();
	}

	setStart(p: IPoint) {
		this.pathPoints[0] = { ...p };
		if (this.to) {
			this.recalcPath(this.to.cx, this.to.cy, this.to.width, this.to.height);
		}
		this.cdRef.markForCheck();
	}
}

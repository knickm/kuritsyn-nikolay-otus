import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IPoint } from 'src/app/arch/models/point';
import { CommonElementComponent } from '../common-element.component';

@Component({
	selector: 'svg:g[app-use-case-element]',
	templateUrl: './use-case-element.component.html',
	styleUrls: ['./use-case-element.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseElementComponent extends CommonElementComponent {

	get cx(): number {
		return this.options.x;
	}

	get cy(): number {
		return this.options.y;
	}

	protected init(): void {
		this.options.width = 100;
		this.options.height = 50;
		this.options.name ||= 'Use Case';
		this.options.elementType = 'usecase';
	}

	calcStartPos(endPos: IPoint): IPoint {
		const w2 = this.width / 2;
		const h2 = this.height / 2;
		const cx = this.x;
		const cy = this.y;
		const x = endPos.x > cx ? cx + w2 : cx - w2;
		const y = endPos.y > cy ? cy + h2 : cy - h2;
		// console.log(endPos, cx, cy, x, y);
		return { x, y };
	}
}

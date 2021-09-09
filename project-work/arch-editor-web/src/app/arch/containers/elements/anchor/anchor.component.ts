import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AnchorType, IDrag } from 'src/app/arch/models/interfaces';
import { IPoint } from 'src/app/arch/models/point';
import { IMouseState } from 'src/app/arch/store/states/mouse.state';

import * as fromStore from '../../../store';

@Component({
	selector: '[appAnchor]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<svg:rect
[attr.x]="Position.x" [attr.y]="Position.y"
[attr.width]="10" [attr.height]="10"
[attr.fill]="'black'"
[attr.type]="Type"/>`,
	styleUrls: ['./anchor.component.scss']
})
export class AnchorComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject();

	@Input()
	appAnchor!: string;

	@Input()
	Position!: IPoint;

	@Input()
	Type!: AnchorType;

	@Output()
	onDrag = new EventEmitter<IDrag>();

	private dragged = false;

	constructor(
		private storeMouse: Store<fromStore.mouseState.IMouseState>
	) {
		this.storeMouse.pipe(
			takeUntil(this.unsubscribe$),
			select(fromStore.mouseSelector.getMouseState),
			filter(e => this.dragged || e.elementId === this.appAnchor)
		).subscribe(e => {
			if (e.action === 'down') {
				this.dragged = true;
			}
			else if (e.action === 'up') {
				this.dragged = false;
			}
			else if (this.dragged) {
				this.drag(e);
			}
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	private drag(mState: IMouseState) {
		this.onDrag.emit({
			movement: {
				x: mState.movement!.x,
				y: mState.movement!.y
			},
			anchor: this.Type
		});
	}
}

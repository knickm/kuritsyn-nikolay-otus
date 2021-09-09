import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonUMLType, DrawMode, IDrag, IElement } from '../../models/interfaces';
import { IPoint } from '../../models/point';

import * as fromStore from '../../store';
import { ArrowComponent } from './arrow/arrow.component';

@Component({
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class CommonElementComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject();

	@Input()
	options: IElement = {
		id: 0,
		elementId: '',
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		name: '',
		description: ''
	};

	get id(): number {
		return this.options.id;
	}

	get elementId(): string {
		return this.options.elementId;
	}

	get x(): number {
		return this.options.x;
	}

	get y(): number {
		return this.options.y;
	}

	get cx(): number {
		return this.options.x + this.options.width / 2;
	}

	get cy(): number {
		return this.options.y + this.options.height / 2;
	}

	get width(): number {
		return this.options.width;
	}

	get height(): number {
		return this.options.height;
	}

	@Input()
	selected = false;

	@Input()
	mode: DrawMode = 'create';

	@Output()
	onSelected = new EventEmitter<IElement>();

	@Output()
	onCreateLink = new EventEmitter<number>();

	@Output()
	onUpdateLink = new EventEmitter<IPoint>();

	@Output()
	onLink = new EventEmitter<number>();

	linkStart: Array<ArrowComponent> = [];
	linkEnd: Array<ArrowComponent> = [];

	private dragged = false;

	private get pattern() {
		return this.id + '_[sn][we]';
	}

	constructor(
		public cdRef: ChangeDetectorRef,
		protected elRef: ElementRef,
		private storeMouse: Store<fromStore.mouseState.IMouseState>
	) {
		this.storeMouse.pipe(
			takeUntil(this.unsubscribe$),
			select(fromStore.mouseSelector.getMouseState),
		).subscribe(e => {
			if (e.action === 'down') {
				const re = new RegExp(this.pattern);
				this.dragged = e.elementId === this.elementId;
				this.selected = this.dragged || (e.elementId.match(re) !== null);
				if (this.selected) {
					this.onSelected.emit(this.options);
				}
			} else if (e.action === 'up' && e.elementId === this.elementId) {
				if (this.mode === 'link') {
					this.onLink.emit(this.id);
				}
				this.dragged = false;
			} else if (e.action === 'move' && e.elementId === this.elementId) {
				if (this.dragged) {
					this.drag(e);
				} else if (this.mode === 'link') {
					this.onUpdateLink.emit({ x: e.position!.x, y: e.position!.y });
				}
			}
			this.cdRef.markForCheck();
		});
	}

	ngOnInit(): void {
		this.init();
		this.cdRef.detectChanges();
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	protected init(): void {

	}

	private drag(e: fromStore.mouseState.IMouseState) {
		this.options.x += e.movement!.x;
		this.options.y += e.movement!.y;
		this.recalckLink();
		this.cdRef.markForCheck();
	}

	onResize(event: IDrag) {
		const X = event.movement.x;
		const Y = event.movement.y;
		let _x = this.options.x;
		let _y = this.options.y;
		let _width = this.options.width;
		let _height = this.options.height;
		switch (event.anchor) {
			case "nw":
				// top-left
				_x += X;
				_y += Y;
				_width -= X;
				break;
			case "ne":
				// top-right
				_y += Y;
				_width += X;
				_height -= Y;
				break;
			case "se":
				// bottom-right
				_width += X;
				_height += Y;
				break;
			case "sw":
				// bottom-left
				_x += X;
				_width -= X;
				_height += Y;
				break;
		}
		this.options = {
			...this.options,
			x: _x,
			y: _y,
			width: _width,
			height: _height
		};
		this.recalckLink();
		this.cdRef.markForCheck();
	}

	CreateLink() {
		this.onCreateLink.emit(this.id);
	}

	recalckLink() {
		const x = this.x + this.width / 2;
		const y = this.y + this.height / 2;
		this.linkStart.forEach(l => l.setStart({ x: this.x, y: this.y }));
		this.linkEnd.forEach(l => l.setEnd({ x: this.x, y: this.y }));
	}
}

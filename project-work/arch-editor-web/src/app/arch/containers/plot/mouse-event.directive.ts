import { Directive, ElementRef, OnDestroy, Input, NgZone, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { takeUntil } from 'rxjs/operators';
import { Point } from '../../models/point';

@Directive({
	selector: '[appMouseEvent]'
})
export class MouseEventDirective implements OnDestroy {
	private unsubscribe$ = new Subject();

	@Input('appMouseEvent') appMouseEvent!: string;

	private prevDown = 0;

	constructor(
		private ngZone: NgZone,
		public elRef: ElementRef,
		private store: Store<fromStore.mouseState.IMouseState>
	) {
		this.ngZone.runOutsideAngular(() => {
			fromEvent<MouseEvent>(this.elRef.nativeElement, 'mousedown')
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(e => {
					this.store.dispatch(fromStore.mouseAction.MouseDown({ elementId: this.appMouseEvent }));
					e.stopPropagation();
					e.preventDefault();
					if (e.timeStamp - this.prevDown < 300) {
						this.store.dispatch(fromStore.mouseAction.MouseDouble({ elementId: this.appMouseEvent }));
					}
					this.prevDown = e.timeStamp;
				});

			fromEvent<MouseEvent>(this.elRef.nativeElement, 'mouseup')
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(e => {
					this.store.dispatch(fromStore.mouseAction.MouseUp({ elementId: this.appMouseEvent }));
					e.stopPropagation();
					e.preventDefault();
				});

			fromEvent<MouseEvent>(this.elRef.nativeElement, 'mousemove')
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe(e => {
					console.log('movementY:', e.movementY, '; offsetY:', e.offsetY);
					this.store.dispatch(
						fromStore.mouseAction.MouseMove({
							elementId: this.appMouseEvent,
							position: new Point(e.offsetX, e.offsetY).toObject(),
							movement: new Point(e.movementX, e.movementY).toObject()
						})
					);
					e.stopPropagation();
					e.preventDefault();
				});

			// fromEvent<MouseEvent>(this.elRef.nativeElement, 'mouseout')
			// 	.pipe(takeUntil(this.unsubscribe$))
			// 	.subscribe(e => {
			// 		this.store.dispatch(
			// 			fromStore.mouseAction.MouseOut({ elementId: this.appMouseEvent })
			// 		);
			// 		e.stopPropagation();
			// 		e.preventDefault();
			// 	});
		})
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

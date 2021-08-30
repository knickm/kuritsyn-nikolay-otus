import { Component, OnInit, ChangeDetectionStrategy, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild, Input, ComponentFactoryResolver, Type, Injector, ComponentRef, ViewContainerRef, } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { PAGE } from '../../models';
import { IPoint } from '../../models/point';
import * as fromStore from '../../store';
import { range } from '../../util/num';
import { CommonUMLType } from '../elements';
import { ActorElementComponent } from '../elements/actor-element/actor-element.component';
import { UseCaseElementComponent } from '../elements/use-case-element/use-case-element.component';

const DEFAULT_SIZE = PAGE.A4; // Размер страницы для печати
const DPI = window.devicePixelRatio * 96 / 25.4;

@Component({
	selector: 'app-plot',
	template: `
		<ng-container #content></ng-container>
		<svg #plot [attr.viewBox]="'0 0 '+width+' '+height" xmlns="http://www.w3.org/2000/svg"
			class="m-4 mat-elevation-z6"
			[appMouseEvent]="'plot'"
			[attr.width]="width"
			[attr.height]="height"
		>
		<g>
			<ng-container *ngFor="let y of vlist">
			<line [attr.x1]="0" [attr.x2]="width" [attr.y1]="y" [attr.y2]="y" stroke="rgba(135, 206, 235, 0.3)"/>
			</ng-container>
			<ng-container *ngFor="let x of hlist">
			<line [attr.x1]="x" [attr.x2]="x" [attr.y1]="0" [attr.y2]="height" stroke="rgba(135, 206, 235, 0.3)"/>
			</ng-container>
		</g>
		</svg>
	`,
	styleUrls: ['./plot.component.scss'],
	host: {
		class: 'flex-row justify-center align-center'
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotComponent implements OnInit, AfterViewInit, OnDestroy {
	private unsubscribe$ = new Subject();

	@ViewChild('content', { read: ViewContainerRef })
	contentRef!: ViewContainerRef;

	@Input()
	element: string | null = null;

	@ViewChild('plot') canvas!: ElementRef;

	width = 10;
	height = 10;
	size = DEFAULT_SIZE;

	get hlist(): Array<number> {
		return range(0, this.width, 10 * DPI);
	}
	get vlist(): Array<number> {
		return range(0, this.height, 10 * DPI);
	}

	constructor(
		private injector: Injector,
		private componentFactoryResolver: ComponentFactoryResolver,
		// private viewContainerRef: ViewContainerRef,
		private elRef: ElementRef,
		private cdRef: ChangeDetectorRef,
		private storeMouse: Store<fromStore.mouseState.IMouseState>
	) {
	}

	ngOnInit() {
		this.width = this.size.width * DPI;
		this.height = this.size.height * DPI;

		this.storeMouse.pipe(
			select(fromStore.mouseSelector.getMouseState),
			// tap(e => console.log(e)),
			filter(e => e.elementId === 'plot' && e.action === 'down')
		).subscribe(e => {
			if (this.element) {
				this.addElement(e.position)
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	ngAfterViewInit() {
		this._drawGrid();
	}

	private _drawGrid() {
		if (this.canvas) {
			this.canvas.nativeElement.append();
		}
	}

	private _drawGridCanvas() {
		const canvas = this.canvas.nativeElement;
		if (canvas.getContext) {
			var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.strokeStyle = 'rgba(135, 206, 235, 0.3)';
			const step = 10 * DPI;
			for (let x = step - 1; x < this.width; x += step) {
				ctx.moveTo(x, 0);
				ctx.lineTo(x, this.height);
			}
			for (let y = step - 1; y < this.height; y += step) {
				ctx.moveTo(0, y);
				ctx.lineTo(this.width, y);
			}
			ctx.stroke();
		}
	}

	private selectType(element: string): Type<CommonUMLType> | undefined {
		return {
			'actor': ActorElementComponent,
			'usecase': UseCaseElementComponent
		}[element];
	}

	addElement(p: IPoint | null) {
		if (!this.element) {
			console.error('BAD ELEMENT:', p, this.element);
			return;
		}
		const eType = this.selectType(this.element);
		if (!eType) {
			console.error('BAD TYPE:', this.element);
			return;
		}

		const factory = this.componentFactoryResolver.resolveComponentFactory(eType);
		const componentRef = this.contentRef.createComponent(factory);
		if (!(componentRef && componentRef.instance)) {
			console.error('Cannot create element:', this.element, eType);
			return;
		}
		if (p) {
			componentRef.instance.top = p.y;
			componentRef.instance.left = p.x;
		}
		this.contentRef.insert(componentRef.hostView);
		componentRef.instance.ngOnInit();
		componentRef.instance.cdRef.detectChanges();

		// const componentRef = factory.create(this.injector);

		// if (!(componentRef && componentRef.instance)) {
		// 	console.error('Cannot create element:', this.element, eType);
		// 	return;
		// }

		// this.viewContainerRef.insert(componentRef.hostView);
	}
}
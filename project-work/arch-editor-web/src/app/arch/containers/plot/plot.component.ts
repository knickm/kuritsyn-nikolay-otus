import { Component, OnInit, ChangeDetectionStrategy, ElementRef, AfterViewInit, ChangeDetectorRef, OnDestroy, ViewChild, Input, ComponentFactoryResolver, Type, Injector, ComponentRef, ViewContainerRef, Output, EventEmitter, } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { today } from 'src/app/core/util/date';

import { PAGE } from '../../models';
import { CommonUMLType, DrawMode, IElement, ILink } from '../../models/interfaces';
import { IPoint } from '../../models/point';
import { IProject } from '../../models/project';
import * as fromStore from '../../store';
import { range } from '../../util/num';
import { ActorElementComponent } from '../elements/actor-element/actor-element.component';
import { ArrowComponent } from '../elements/arrow/arrow.component';
import { UseCaseElementComponent } from '../elements/use-case-element/use-case-element.component';

const DEFAULT_SIZE = PAGE.A4; // Размер страницы для печати
const DPI = window.devicePixelRatio * 96 / 25.4;

@Component({
	selector: 'app-plot',
	template: `
		<div class="flex-row justify-center mt-3">
			<button mat-raised-button type="submit" attr.aria-label="Сохранить" (click)="Save()">
				<h2>Сохранить</h2>
			</button>
		</div>
		<svg #plot [attr.viewBox]="'0 0 '+width+' '+height" xmlns="http://www.w3.org/2000/svg"
			class="m-4 mat-elevation-z6"
			[appMouseEvent]="'plot'"
			[attr.width]="width"
			[attr.height]="height"
		>
		<defs>
			<marker id='arrow-head-blue' orient='auto' markerWidth='6' markerHeight='8' refX='2' refY='4'>
				<path d='M0,0 L4,4 0,8' fill="rgba(0, 102, 180, 1)" stroke='rgba(0, 102, 180, 1)' />
			</marker>
		</defs>
		<g>
			<ng-container *ngFor="let y of vlist">
			<line [attr.x1]="0" [attr.x2]="width" [attr.y1]="y" [attr.y2]="y" stroke="rgba(135, 206, 235, 0.3)"/>
			</ng-container>
			<ng-container *ngFor="let x of hlist">
			<line [attr.x1]="x" [attr.x2]="x" [attr.y1]="0" [attr.y2]="height" stroke="rgba(135, 206, 235, 0.3)"/>
			</ng-container>
		</g>
		<ng-container #content></ng-container>
		</svg>
	`,
	styleUrls: ['./plot.component.scss'],
	host: {
		class: 'flex-column justify-center align-center'
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlotComponent implements OnInit, AfterViewInit, OnDestroy {
	private unsubscribe$ = new Subject();

	@Input()
	set project(v: IProject | null) {
		this._project = v;
		this.makeElements();
	}
	_project: IProject | null = null;

	@Input()
	element: string | null = null;

	@Input()
	set name(v: string) {
		const element = this.elementList[this.elementSelected];
		if (element) {
			element.instance.options.name = v;
			this.cdRef.markForCheck();
		}
	}

	@Input()
	set description(v: string) {
		const element = this.elementList[this.elementSelected];
		if (element) {
			element.instance.options.description = v;
			this.cdRef.markForCheck();
		}
	}

	@Output()
	onSelectedElement = new EventEmitter<IElement>();

	@Output()
	onSave = new EventEmitter<IProject>();

	@ViewChild('content', { read: ViewContainerRef })
	contentRef!: ViewContainerRef;

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

	private elementList: Array<ComponentRef<CommonUMLType>> = [];
	private linkList: Array<ILink> = [];
	private elementSelected = 0;
	private linkSelected = 0;
	private mode: DrawMode = 'create';

	get Link(): ArrowComponent {
		return this.linkList[this.linkSelected].link.instance;
	}
	get CurrentLink(): ILink {
		return this.linkList[this.linkSelected];
	}

	constructor(
		private injector: Injector,
		private componentFactoryResolver: ComponentFactoryResolver,
		// private viewContainerRef: ViewContainerRef,
		private elRef: ElementRef,
		private cdRef: ChangeDetectorRef,
		private storeMouse: Store<fromStore.mouseState.IMouseState>
	) {
		this.storeMouse.pipe(
			takeUntil(this.unsubscribe$),
			select(fromStore.mouseSelector.getMouseState),
			// tap(e => console.log(e)),
			filter(e => e.elementId === 'plot')
		).subscribe(e => {
			console.log(this.mode, e.action, e.position);
			if (e.action === 'down' && this.element && this.mode === 'create') {
				this.addElement(e.position)
			} else if (this.mode === 'link') {
				if (e.action === 'move') {
					this.Link.setEnd(e.position!);
					this.cdRef.markForCheck();
				} else if (e.action === 'up') {
					this.mode = 'create';
					this.removeLink();
				}
			}
		});
	}

	ngOnInit() {
		this.width = this.size.width * DPI;
		this.height = this.size.height * DPI;
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

	private selectType(element: string): Type<CommonUMLType> | undefined {
		return {
			'actor': ActorElementComponent,
			'usecase': UseCaseElementComponent
		}[element];
	}

	addElement(p: IPoint | null, name?: string, width?: number, height?: number) {
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
		// const componentRef = this.contentRef.createComponent(factory);
		const groupNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		const componentRef = factory.create(this.injector, [], groupNode);
		if (!(componentRef && componentRef.instance)) {
			console.error('Cannot create element:', this.element, eType);
			return;
		}
		this.contentRef.insert(componentRef.hostView);
		this.elementSelected = this.elementList.length;
		componentRef.instance.options = {
			id: this.elementSelected,
			elementId: this.element + '_' + this.elementSelected,
			elementType: this.element,
			x: p!.x,
			y: p!.y,
			width: width || 100,
			height: height || 100,
			name: name || ''
		};

		componentRef.instance.onSelected.subscribe(e => {
			this.elementSelected = e.id;
			this.onSelectedElement.emit(e);
		});

		componentRef.instance.onCreateLink.subscribe(id => this.addArrow(id));
		componentRef.instance.onLink.subscribe(id => {
			this.mode = 'create';
			this.elementList.forEach(c => c.instance.mode = 'create');
			const link = this.linkList[this.linkSelected]
			const element = this.elementList[id];
			element.instance.linkEnd.push(link.link.instance);
			link.to = element;
			link.link.instance.setEnd({
				x: element.instance.x + element.instance.width / 2,
				y: element.instance.y + element.instance.height / 2
			});
		});
		componentRef.instance.onUpdateLink.subscribe(pos => {
			this.Link.setEnd(pos);
			this.cdRef.markForCheck();
		});
		componentRef.instance.ngOnInit();
		componentRef.instance.selected = true;

		this.onSelectedElement.emit(componentRef.instance.options);
		componentRef.instance.cdRef.detectChanges();
		this.elementList.push(componentRef);
		this.cdRef.detectChanges();
	}

	addArrow(id: number) {
		const element = this.elementList[id];
		if (!element) {
			console.error('BAD ID:', id);
			return;
		}

		const factory = this.componentFactoryResolver.resolveComponentFactory(ArrowComponent);
		// const componentRef = this.contentRef.createComponent(factory);
		const groupNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		const linkRef = factory.create(this.injector, [], groupNode);
		if (!(linkRef && linkRef.instance)) {
			console.error('Cannot create arrow');
			return;
		}
		this.contentRef.insert(linkRef.hostView);

		const pos = {
			x: element.instance.x + element.instance.width / 2,
			y: element.instance.y + element.instance.height / 2
		};
		linkRef.instance.setStart(pos);
		linkRef.instance.setEnd(pos, true);

		linkRef.instance.from = element.instance;

		element.instance.linkStart.push(linkRef.instance);

		this.elementList.forEach(c => c.instance.mode = 'link');

		this.linkSelected = this.linkList.length;
		this.linkList.push({ link: linkRef, from: element, to: null });
		this.mode = 'link';

		this.cdRef.detectChanges();
	}

	removeLink() {
		const link = this.linkList.splice(this.linkSelected, 1);
		link[0].link.destroy();
	}

	Save() {
		if (this._project === null) {
			this._project = {
				date: today().toLocaleDateString(),
				name: today().toLocaleDateString(),
				params: { editable: true },
				elements: []
			};
		} else {
			this._project.date = today().toLocaleDateString();
		}
		this._project.elements = this.elementList.map(c => c.instance.options);
		this.onSave.emit(this._project);
	}

	private makeElements() {
		if (this._project && this._project.elements) {
			this._project.elements.forEach(e => {
				this.element = e.elementType;
				this.addElement({ x: e.x, y: e.y }, e.name, e.width, e.height);
			});
		}
	}
}
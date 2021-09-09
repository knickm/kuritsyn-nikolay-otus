import { ComponentRef } from "@angular/core";
import { ActorElementComponent } from "../containers/elements/actor-element/actor-element.component";
import { ArrowComponent } from "../containers/elements/arrow/arrow.component";
import { UseCaseElementComponent } from "../containers/elements/use-case-element/use-case-element.component";
import { IPoint } from "./point";

export interface ILine {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export interface ITextPosition {
	x: number;
	y: number;
	v: string;
}

export type AnchorType = 'ne' | 'nw' | 'se' | 'sw';

export interface IDrag {
	movement: IPoint;
	anchor: AnchorType;
}

export type DrawMode = 'create' | 'link';

export interface IElement {
	id: number;
	elementId: string;
	x: number;
	y: number;
	width: number;
	height: number;
	name: string;
	description?: string;
}

export type CommonUMLType = ActorElementComponent | UseCaseElementComponent;

export interface ILink {
	link: ComponentRef<ArrowComponent>;
	from: ComponentRef<CommonUMLType>;
	to: ComponentRef<CommonUMLType> | null;
}
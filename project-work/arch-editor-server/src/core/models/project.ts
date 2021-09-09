export interface IProjectParams {
	editable: boolean;
}

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

export interface IProject {
	id: number;
	date: string;
	name: string;
	params: IProjectParams;
	elements: Array<IElement>;
}
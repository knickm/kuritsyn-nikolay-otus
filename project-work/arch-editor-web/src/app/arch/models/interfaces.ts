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
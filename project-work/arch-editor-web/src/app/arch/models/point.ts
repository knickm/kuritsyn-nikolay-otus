export interface IPoint {
	x: number;
	y: number;
}

const isPoint = (p: any) => 'x' in p && 'y' in p;

export class Point implements IPoint {
	x: number;
	y: number;

	static subtraction(p: Point, s: number | Point): Point {
		const res = new Point(p);
		return res.sub(s);
	}

	static fold(p: Point, s: number | Point): Point {
		const res = new Point(p);
		return res.add(s);
	}

	static sum(p: Point, ...s: Array<number | Point>): Point {
		const res = new Point(p);
		s.forEach(n => res.add(n));
		return res;
	}

	constructor(x: number, y: number);
	constructor(p: Point);
	constructor(p: IPoint);
	constructor(p1: number | Point | IPoint, p2?: number) {
		if (p1 instanceof Point) {
			this.x = p1.x;
			this.y = p1.y;
		} else if (typeof p1 === 'object' && isPoint(p1)) {
			this.x = (p1 as IPoint).x;
			this.y = (p1 as IPoint).y;
		} else if (typeof p1 !== 'object') {
			this.x = p1 as number;
			this.y = p2 === undefined ? p1 as number : p2;
		} else {
			throw 'Bad usage Point object';
		}
	}

	add(p: number | Point): Point {
		if (p instanceof Point) {
			this.x += p.x;
			this.y += p.y;
		} else {
			this.x += p;
			this.y += p;
		}
		return this;
	}
	sub(p: number | Point): Point {
		if (p instanceof Point) {
			this.x -= p.x;
			this.y -= p.y;
		} else {
			this.x -= p;
			this.y -= p;
		}
		return this;
	}

	toObject(): IPoint {
		return { x: this.x, y: this.y };
	}
}
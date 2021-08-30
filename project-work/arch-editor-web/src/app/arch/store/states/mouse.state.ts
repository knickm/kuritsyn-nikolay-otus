import { IPoint } from "../../models/point";

export interface IMouseState {
	elementId: string;
	action: 'up' | 'down' | 'out' | 'double' | 'move' | 'wheel' | 'none';
	position: IPoint | null;
	wheel: number; // счетчик прокруток
}

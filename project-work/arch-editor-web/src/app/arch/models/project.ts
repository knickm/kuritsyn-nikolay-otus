export interface IProjectParams {
	editable: boolean;
}

export interface IProject {
	id: number;
	date: string;
	name: string;
	params: IProjectParams;
}
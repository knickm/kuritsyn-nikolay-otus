export interface IMenu {
	link?: string;
	title: string;
	action?: string;
	subMenu?: IMenu[];
	condition?: string[];
	disabled?: boolean;
}

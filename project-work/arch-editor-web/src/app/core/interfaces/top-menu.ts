export interface IMenu {
	link?: string;
	title: string;
	action?: string;
	subMenu?: IMenu[];
	condition?: string[];
	disabled?: boolean;
}

export const createFromJson = (menu: IMenu, checkCondition: (c: string[]) => boolean): IMenu => {
	const { link, title, action, subMenu, condition, disabled } = menu;
	return {
		link, title, action, condition,
		disabled: condition ? checkCondition(condition) : false,
		subMenu: subMenu?.map(m => createFromJson(m, checkCondition))
	}
}
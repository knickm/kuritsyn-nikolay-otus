import { IMenu } from "../interfaces/top-menu";

export const createFromJson = (menu: IMenu, checkCondition: (c: string[]) => boolean = () => true): IMenu => {
	const { link, title, action, subMenu, condition, disabled } = menu;
	return {
		link, title, action, condition,
		disabled: condition ? checkCondition(condition) : false,
	}
}
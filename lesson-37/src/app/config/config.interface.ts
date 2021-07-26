import { IThemeDescription } from "../core/interfaces";
import { ILangDescription } from "../core/interfaces/lang";

export interface IConfig {
	appName: string;
	env: {
		name: string;
	},
	apiServer: {
		url: string;
		port: number;
		pathPrefix1: string;
		pathPrefix2: string;
	},
	langList: Array<ILangDescription>,
	themeList: Array<IThemeDescription>,
	appParams: any
}

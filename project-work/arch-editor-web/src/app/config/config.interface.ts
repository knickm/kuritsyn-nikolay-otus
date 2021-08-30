import { IThemeDescription } from "../core/interfaces";

export interface IConfig {
	appName: string;
	env: {
		name: string;
	},
	apiServer: {
		url: string;
		port: number;
		pathPrefix: string;
	},
	themeList: Array<IThemeDescription>,
	appParams: any
}

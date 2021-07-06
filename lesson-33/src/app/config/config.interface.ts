import { ILangDescription } from "src/app/core/interfaces";

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
	langList: Array<ILangDescription>,
	appParams: any
}

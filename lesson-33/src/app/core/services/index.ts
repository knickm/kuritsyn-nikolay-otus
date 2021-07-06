import { DBService } from "./storage";
import { TranslateService } from "./translate";

export const services = [
	DBService,
	TranslateService
];


export * from './token.interceptor';
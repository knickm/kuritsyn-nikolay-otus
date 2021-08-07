import { SettingsGuard } from "./settings.guard";
import { SettingsService } from "./settings.service";
import { DBService } from "./storage.service";
import { TranslateService } from "./translate.service";

export const services = [
	DBService,
	TranslateService,
	SettingsService,
	SettingsGuard
];


export * from './token.interceptor';
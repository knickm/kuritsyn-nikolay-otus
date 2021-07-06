import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IConfig } from './config.interface';
import { ILangDescription } from '../core/interfaces';

@Injectable()
export class AppConfig {
	private configData: IConfig | null = null;

	constructor(private httpClient: HttpClient) {
	}

	load(): Promise<void> {
		const jsonFile = `assets/config/config.${environment.name}.json`;
		const commonJsonFile = `assets/config/config.common.json`;
		return new Promise<void>((resolve, reject) => {
			this.httpClient.get(jsonFile).toPromise().then((response) => {
				this.httpClient.get(commonJsonFile).toPromise().then((responseCommon) => {
					this.configData = Object.assign(response, responseCommon) as IConfig;
					resolve();
				}).catch((err: any) => { throw new Error(err) })
			}).catch((response: any) => {
				reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
			});
		});
	}

	get appName(): string {
		if (this.configData?.appName) {
			return this.configData?.appName
		}
		throw new Error("Unknown application name in config");
	}

	get appParams(): any {
		if (this.configData?.appParams) {
			return this.configData?.appParams
		}
		return {};
	}

	get envName(): string {
		if (this.configData?.env.name) {
			return this.configData?.env.name
		}
		throw new Error("Unknown enviroment name in config");
	}

	get endPoint(): string {
		const apiServer = this.configData?.apiServer;
		if (apiServer && apiServer.url) {
			return apiServer.url;
		}
		throw new Error("Unknown api server params in config");
	}

	get pathPrefix(): string {
		const apiServer = this.configData?.apiServer;
		if (apiServer) {
			return apiServer.pathPrefix || '';
		}
		return '';
	}

	get langList(): Array<ILangDescription> {
		return this.configData?.langList || [{ code: "ru", name: "Русский" }];
	}

}
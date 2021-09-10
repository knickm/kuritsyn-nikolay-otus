import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppConfig } from './config.service';

describe('ConfigService', () => {
	let service: AppConfig;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [
				HttpTestingController,
				AppConfig
			],
		});
		service = TestBed.inject(AppConfig);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	//   it('should be return value env.name', () => {
	//     service.load().then(() => {
	//       expect(service.data?.env.name).toBe("dev")
	//     })
	//   });

	it('should be return value env.name', () => {
		service.load().then(() => expect(service.envName).toBe("dev"))
	});
});

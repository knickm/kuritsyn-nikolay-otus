import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared/shared.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromStore from './store';
import * as fromServices from './services';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		StoreModule.forFeature('auth', fromStore.reducer),
		EffectsModule.forFeature(fromStore.effects),

		CoreModule,
		SharedModule
	],
	declarations: [
		...fromComponents.components,
		...fromContainers.components,
	],
	exports: [...fromComponents.components, ...fromContainers.components],
	entryComponents: [
		...fromComponents.entryComponents,
		...fromContainers.entryComponents
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: fromServices.TokenInterceptor,
			multi: true
		},

		...fromServices.services
	],
})
export class AuthModule { }

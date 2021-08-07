import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromServices from './services';
import * as fromStore from './store';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		FontAwesomeModule,
		StoreModule.forFeature('core', fromStore.coreReducers),
		EffectsModule.forFeature(fromStore.effects),
	],
	providers: [...fromServices.services],
	exports: [FontAwesomeModule],
})
export class CoreModule { }

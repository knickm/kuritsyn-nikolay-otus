import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ArchRoutingModule } from './arch-routing.module';

import * as fromArchContainers from './containers';
import * as fromArchComponents from './components';
import * as fromStore from './store';
import * as fromServices from './services';

@NgModule({
	declarations: [
		...fromArchContainers.components,
		...fromArchComponents.components
	],
	imports: [
		CommonModule,
		ArchRoutingModule,

		StoreModule.forFeature('project', fromStore.projectReducer.reducer),
		StoreModule.forFeature('mouse', fromStore.mouseReducer.reducer),
		StoreModule.forFeature('menu', fromStore.menuReducer.reducer),

		EffectsModule.forFeature(fromStore.effects),

		CoreModule,
		SharedModule,
	],
	providers: [
		...fromServices.services
	],
})
export class ArchModule { }

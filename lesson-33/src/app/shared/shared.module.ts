import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCommonModule } from './mat.common.module';

import * as fromComponents from './components';
import * as fromContainers from './containers';
import { CoreModule } from '../core/core.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		MatCommonModule,
		CoreModule
	],
	declarations: [
		...fromComponents.components,
		...fromContainers.components
	],
	exports: [
		MatCommonModule,
		FormsModule,
		ReactiveFormsModule,
		...fromComponents.components,
		...fromContainers.components,
	],
	entryComponents: [
		...fromContainers.entryComponents,
		...fromComponents.entryComponents
	]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fromDirectives from './directives';
import * as fromServices from './services';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		FontAwesomeModule,
	],
	providers: [...fromServices.services],
	declarations: [...fromDirectives.components],
	exports: [FontAwesomeModule, ...fromDirectives.components],
})
export class CoreModule { }

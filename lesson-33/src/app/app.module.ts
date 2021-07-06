import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppConfig } from './config/config.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import * as fromLayoutContainers from './layout/containers';
import * as fromLayoutComponents from './layout/components';
import * as fromServices from './core/services';

import { GoComponent } from './layout/containers/go/go.component';
import { SettingsComponent } from './layout/containers/settings/settings.component';
import { HomeComponent } from './layout/containers/home/home.component';

function initApp(configurationService: AppConfig) {
	return () => configurationService.load();
}

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
		...fromLayoutContainers.components,
		...fromLayoutComponents.components,
		GoComponent,
		SettingsComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,

		CoreModule,
		SharedModule,
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
	],
	providers: [
		AppConfig,
		{
			provide: APP_INITIALIZER,
			useFactory: initApp,
			multi: true,
			deps: [AppConfig]
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: fromServices.TokenInterceptor,
			multi: true
		},

		...fromServices.services,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

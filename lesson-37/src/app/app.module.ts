import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppConfig } from './config/config.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { metaReducers, ROOT_REDUCERS } from './store';
import { CustomSerializer } from './store/reducers/serializer';
import * as fromEffects from './store/effects';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import * as fromLayoutContainers from './layout/containers';
import * as fromLayoutComponents from './layout/components';
import * as fromServices from './core/services';

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
		HomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CommonModule,

		AppRoutingModule,
		CoreModule,
		SharedModule,

		StoreModule.forRoot(ROOT_REDUCERS, {
			metaReducers, runtimeChecks: {
				strictActionImmutability: true,
				strictActionSerializability: true,
				strictStateImmutability: true,
				strictStateSerializability: true
			}
		}),
		StoreModule.forFeature('router', ROOT_REDUCERS),

		EffectsModule.forRoot(fromEffects.effects),

		/**
		 * @ngrx/router-store keeps router state up-to-date in the store.
		 */
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal,
			serializer: CustomSerializer,
		}),

		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.name === "deploy" // Restrict extension to log-only mode
		}),
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

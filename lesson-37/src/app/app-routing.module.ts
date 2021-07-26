import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsGuard } from './core/services/settings.guard';
import { GoComponent } from './layout/containers/go/go.component';
import { HomeComponent } from './layout/containers/home/home.component';
import { RecentlyAddedComponent } from './layout/containers/recently-added/recently-added.component';
import { SettingsComponent } from './layout/containers/settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent,
	},
	{
		path: 'recently-added',
		canActivate: [SettingsGuard],
		component: RecentlyAddedComponent,
	},
	{
		path: 'go',
		canActivate: [SettingsGuard],
		component: GoComponent,
	},
	{
		path: 'settings',
		component: SettingsComponent,
	},
	{
		path: '**',
		component: PageNotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

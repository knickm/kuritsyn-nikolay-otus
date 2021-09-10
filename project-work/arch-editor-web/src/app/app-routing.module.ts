import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchModule } from './arch/arch.module';
import { AuthGuard } from './auth/services/auth.guard';
import { HomeComponent } from './layout/containers/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'arch'
	},
	{
		path: 'auth',
		pathMatch: 'full',
		component: HomeComponent,
	},
	{
		path: 'arch',
		canActivate: [AuthGuard],
		loadChildren: () => ArchModule
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectEditorComponent } from './containers/project-editor/project-editor.component';
import { ProjectListComponent } from './containers/project-list/project-list.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'project-list'
	},
	{
		path: 'project-list',
		pathMatch: 'full',
		component: ProjectListComponent
	},
	{
		path: 'project-edite',
		pathMatch: 'full',
		component: ProjectEditorComponent
	},
	{
		path: 'project-edite/:id',
		component: ProjectEditorComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArchRoutingModule { }

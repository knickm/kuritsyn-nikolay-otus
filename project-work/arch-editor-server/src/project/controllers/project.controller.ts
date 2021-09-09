import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { IResponseMessage } from 'src/core/models';
import { IProject } from 'src/core/models/project';
import { ProjectService } from '../services/project.service';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectController {

	constructor(
		private readonly projectServices: ProjectService,
	) { }

	@Get()
	getAll(): Array<IProject> {
		return this.projectServices.list();
	}

	@Get(':id')
	getProtocol(@Param('id') id: number): IProject {
		return this.projectServices.find(id);
	}

	@Post()
	create(
		@Body() project: IProject,
	): number {
		console.log(project);
		return this.projectServices.create(project);
	}
}

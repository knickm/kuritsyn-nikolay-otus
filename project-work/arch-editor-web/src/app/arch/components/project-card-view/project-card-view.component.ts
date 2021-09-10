import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IProject } from '../../models/project';

@Component({
	selector: 'app-project-card-view',
	templateUrl: './project-card-view.component.html',
	styleUrls: ['./project-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardViewComponent implements OnInit {

	@Input()
	Project?: IProject;

	constructor() { }

	ngOnInit(): void {
	}

}

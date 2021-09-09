import { Component, Input, OnInit } from '@angular/core';
import { IProject } from '../../models/project';

@Component({
	selector: 'app-project-list-view',
	templateUrl: './project-list-view.component.html',
	styleUrls: ['./project-list-view.component.scss']
})
export class ProjectListViewComponent implements OnInit {

	@Input()
	set List(v: Array<IProject> | null) {
		console.log('LIST:::::', v);
		this.list = v || [];
	}
	get List(): Array<IProject> | null {
		return this.list;
	}
	private list: Array<IProject> = [];

	constructor() { }

	ngOnInit(): void {
	}

}

import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models/user';

@Component({
	selector: 'app-header-view',
	templateUrl: './header-view.component.html',
	styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit {
	@Input()
	User: IUser | null = null;

	constructor() { }

	ngOnInit(): void {
	}

}

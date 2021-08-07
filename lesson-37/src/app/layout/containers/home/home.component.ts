import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	host: { class: 'flex-column flex-grow-100 justify-center' },
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit(): void { }

}

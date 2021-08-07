import { Component } from '@angular/core';
import { AppConfig } from '../config/config.service';

@Component({
	selector: 'app-page-not-found',
	template: `
<div class="flex-column flex-grow flex-center">
	<h1>{{ config.appName }}</h1>
	<hr style="width: 100%;">
	<h2><strong>ERROR: 404</strong></h2>
	<strong>Что-то пошло не так. Запрашиваемая страница не найдена.</strong>
	<a routerLink='/'>На главную</a>
</div>`,
	styles: [':host{height:100vh;display:block;}']
})
export class PageNotFoundComponent {
	constructor(public config: AppConfig) { }
}

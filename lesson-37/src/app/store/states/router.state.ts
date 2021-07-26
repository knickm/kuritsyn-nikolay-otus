import {  Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface IAppState {
  router: fromRouter.RouterReducerState<IRouterStateUrl>;
}

export interface IRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}


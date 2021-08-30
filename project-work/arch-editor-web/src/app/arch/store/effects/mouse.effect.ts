import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, EMPTY as empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as fromMouse from '../actions/mouse.actions';
import * as fromGraphics from '../actions/graphics.actions';
import * as fromReducer from '../reducers';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class MouseEffects {
    @Effect()
    wheelMouse$: Observable<Action> = this.actions$.pipe(
        ofType<fromMouse.WheelMouse>(fromMouse.MouseActionTypes.WHEEL_MOUSE),
        switchMap(action => {
            this.storeG.dispatch(
                new fromGraphics.ZoomGraphics(action.payload)
            );
            return empty;
        })
    );

    constructor(
        private actions$: Actions,
        private storeG: Store<fromReducer.GraphicsState>
    ) {}
}

import { Action } from '@ngrx/store';
import { Hero } from '../models/hero';

export const LOAD_SUCCESS = '[Related Heroes] Load Success';

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Hero[]) {}
}

export type Actions = LoadSuccessAction;

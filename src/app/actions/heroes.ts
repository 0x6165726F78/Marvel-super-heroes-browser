import { Action } from '@ngrx/store';
import { Hero } from '../models/hero';

export const LOAD = '[Heroes] Load';
export const LOAD_SUCCESS = '[Heroes] Load Success';
export const SELECT = '[Hero] Select';

export class LoadAction implements Action {
  readonly type = LOAD;
}

export class LoadSuccessAction implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Hero[]) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: number | null) {}
}

export type Actions = LoadAction | LoadSuccessAction | SelectAction;

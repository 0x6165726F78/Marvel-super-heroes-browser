import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

import * as heroes from '../actions/heroes';
import * as relatedHeroes from '../actions/relatedHeroes';

import * as fromHeroes from './heroes';
import * as fromRelatedHeroes from './relatedHeroes';

export interface State {
  heroes: fromHeroes.State;
  relatedHeroes: fromRelatedHeroes.State;
}

const reducers = {
  heroes: fromHeroes.reducer,
  relatedHeroes: fromRelatedHeroes.reducer
};

const mainReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: heroes.Actions | relatedHeroes.Actions) {
  return mainReducer(state, action);
}

export const getHeroesState = (state: State) => state.heroes;

export const getHeroesEntities = createSelector(getHeroesState, fromHeroes.getEntities);
export const getHeroesIds = createSelector(getHeroesState, fromHeroes.getIds);
export const getSelectedHeroId = createSelector(getHeroesState, fromHeroes.getSelectedId);
export const getHeroesLoading = createSelector(getHeroesState, fromHeroes.getLoading);
export const getHeroesLoaded = createSelector(getHeroesState, fromHeroes.getLoaded);
export const getSelectedHero = createSelector(getHeroesState, fromHeroes.getSelected);
export const getAllHeroes = createSelector(getHeroesState, fromHeroes.getAll);

export const getLoadingNewHeroes = createSelector(
  getHeroesLoaded,
  getHeroesLoading,
  (loaded, loading) => loaded && loading
);

export const getRelatedHeroesState = (state: State) => state.relatedHeroes;

export const getRelatedHeroesLoading = createSelector(getRelatedHeroesState, fromRelatedHeroes.getLoading);
export const getRelatedHeroesIds = createSelector(getRelatedHeroesState, fromRelatedHeroes.getIds);

export const getRelatedHeroes = createSelector(getHeroesEntities, getRelatedHeroesIds, (entities, ids) =>
  ids.map(id => entities[id])
);

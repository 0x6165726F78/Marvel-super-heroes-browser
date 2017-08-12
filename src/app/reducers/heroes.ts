import { createSelector } from 'reselect';
import { Hero } from '../models/hero';
import * as heroes from '../actions/heroes';
import * as relatedHeroes from '../actions/relatedHeroes';

export interface State {
  ids: number[];
  entities: { [id: string]: Hero };
  selectedHeroId: number | null;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedHeroId: null,
  loading: true,
  loaded: false
};

export function reducer(state = initialState, action: heroes.Actions | relatedHeroes.Actions): State {
  switch (action.type) {
    case heroes.LOAD: {
      return { ...state, loading: true };
    }

    case heroes.LOAD_SUCCESS:
    case relatedHeroes.LOAD_SUCCESS: {
      const heroes = action.payload;
      const newHeroes = heroes.filter(hero => !state.entities[hero.id]);

      const newHeroesIds = newHeroes.map(({ id }) => id);
      const newHeroesEntities = newHeroes.reduce((entities: { [id: string]: Hero }, hero: Hero) => {
        return { ...entities, [hero.id]: hero };
      }, {});

      return {
        ids: [...state.ids, ...newHeroesIds],
        entities: { ...state.entities, ...newHeroesEntities },
        selectedHeroId: state.selectedHeroId,
        loading: false,
        loaded: true
      };
    }

    case heroes.SELECT: {
      return {
        ...state,
        selectedHeroId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedHeroId;

export const getLoading = (state: State) => state.loading;

export const getLoaded = (state: State) => state.loaded;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});

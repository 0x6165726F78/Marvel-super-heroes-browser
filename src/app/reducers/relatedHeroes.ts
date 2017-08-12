import { createSelector } from 'reselect';
import { Hero } from '../models';
import * as relatedHeroes from '../actions/relatedHeroes';
import * as heroes from '../actions/heroes';

export interface State {
  loading: boolean;
  ids: number[];
}

export const initialState: State = {
  loading: true,
  ids: []
};

export function reducer(state = initialState, action: relatedHeroes.Actions | heroes.Actions): State {
  switch (action.type) {
    case heroes.SELECT: {
      return {
        ...initialState
      };
    }

    case relatedHeroes.LOAD_SUCCESS: {
      const heroes = action.payload;

      return {
        loading: false,
        ids: heroes.map((hero: Hero) => hero.id)
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

import { Http, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/scan';

import * as fromRoot from '../reducers';
import { Hero } from '../models/';
import * as heroes from '../actions/heroes';
import { API_CONFIG } from '../config';

const { BASE_URL, CHARACTERS_PATH } = API_CONFIG;
const API_KEY = `?apikey=${API_CONFIG.API_KEY}&`;

interface Parameters {
  offset: number;
  nameStartsWith: string;
}

@Injectable()
export class HeroesService {
  heroes$: Observable<Hero[]> = this.store.select(fromRoot.getAllHeroes);
  selectedHero$: Observable<Hero> = (this.selectedHero$ = this.store.select(fromRoot.getSelectedHero));
  heroesLoaded$: Observable<boolean> = this.store.select(fromRoot.getHeroesLoaded);
  loadingNewHeroes$: Observable<boolean> = this.store.select(fromRoot.getLoadingNewHeroes);

  constructor(private http: Http, private store: Store<fromRoot.State>) {}

  watchHeroes(searchTerm$: Observable<string>, debounceMs: number = 400) {
    return searchTerm$
      .startWith('')
      .scan((acc, curr) => (curr === undefined ? acc : curr))
      .debounceTime(debounceMs)
      .map((searchTerm: string) => ({ searchTerm, [searchTerm]: 0 }))
      .scan((cache, { searchTerm }) => ({
        ...cache,
        searchTerm,
        [searchTerm]: cache[searchTerm] === undefined ? 0 : Number(cache[searchTerm]) + Number(50)
      }))
      .map(cache => ({ offset: cache[cache.searchTerm], nameStartsWith: cache.searchTerm }))
      .subscribe((parameters: Parameters) => this.loadMoreHeroes(parameters));
  }

  loadMoreHeroes(parameters: Parameters) {
    let params = new URLSearchParams();
    params.set('limit', '50');
    Object.keys(parameters).map(
      paramName => parameters[paramName] !== '' && params.set(paramName, parameters[paramName])
    );
    const PATH = BASE_URL + CHARACTERS_PATH + API_KEY + params.toString();

    this.store.dispatch(new heroes.LoadAction());

    return this.http
      .get(PATH)
      .map(data => data.json())
      .map(({ data }) => data.results)
      .map((results: Hero[]) => new heroes.LoadSuccessAction(results))
      .subscribe(action => this.store.dispatch(action));
  }

  selectHero({ id }: Hero) {
    this.store.dispatch(new heroes.SelectAction(id));
  }

  resetSelectedHero() {
    this.store.dispatch(new heroes.SelectAction(null));
  }
}

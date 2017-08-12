import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import uniqBy from 'lodash.uniqby';

import * as fromRoot from '../reducers';
import { Hero } from '../models/';
import * as relatedHeroes from '../actions/relatedHeroes';
import { API_CONFIG } from '../config';

const { BASE_URL } = API_CONFIG;
const API_KEY = `?apikey=${API_CONFIG.API_KEY}&`;

interface Characters {
  name: string;
  resourceURI: string;
}

@Injectable()
export class RelatedHeroesService {
  relatedHeroes$: Observable<Hero[]> = this.store.select(fromRoot.getRelatedHeroes);
  relatedHeroesLoading$: Observable<boolean> = this.store.select(fromRoot.getRelatedHeroesLoading);

  constructor(private http: Http, private store: Store<fromRoot.State>) {}

  watchRelatedHeroes(hero$: Observable<Hero | undefined>) {
    let name; // [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]

    return hero$
      .filter(hero => hero !== undefined)
      .map(hero => ((name = hero.name), hero)) // [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]
      .map(({ id }) => this.http.get(`${BASE_URL}/v1/public/characters/${id}/comics${API_KEY}limit=50`))
      .flatMap(data => data)
      .map(data => data.json())
      .map(({ data }) => data.results)
      .map(comics => comics.reduce((acc, { characters: { items } }) => [...acc, ...items], []))
      .map((characters: Characters[]) => uniqBy(characters, ({ name }) => name))
      .map(characters => characters.filter(character => character.name !== name))
      .filter(
        characters => (characters.length ? true : (this.store.dispatch(new relatedHeroes.LoadSuccessAction([])), false))
      )
      .map(charactes => charactes.map(({ resourceURI }) => resourceURI).slice(0, 6))
      .map(heroUrls => heroUrls.map(url => this.http.get(`${url}${API_KEY}`)))
      .map(relatedHeroes => Observable.forkJoin(relatedHeroes))
      .flatMap(data => data)
      .map((results: Response[]) => Promise.all(results.map(data => data.json())))
      .map(results => Observable.fromPromise(results))
      .flatMap(data => data)
      .map(results => results.map(({ data }) => data.results[0]))
      .map((heroes: Hero[]) => new relatedHeroes.LoadSuccessAction(heroes))
      .subscribe(action => this.store.dispatch(action));
  }
}

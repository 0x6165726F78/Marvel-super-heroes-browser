import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { animations } from './animations';
import { Hero } from '../../models';
import { HeroesService, RelatedHeroesService } from '../../services';

@Component({
  animations,
  styleUrls: ['./styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mshb-search-input
      [placeholder]="'Search for heroes...'"
      [loading]="loadingNewHeroes$ | async"
      [isReady]="heroesLoaded$ | async"
      (search)="$event && searchTerm$.next($event)"></mshb-search-input>

    <mshb-hero-list
      [selectedHero]="selectedHero$ | async"
      [heroes]="heroes$ | async"
      (selectHero)="handleSelectHero($event)"
      (scroll)="searchTerm$.next()"></mshb-hero-list>

    <mshb-sidebar
      [relatedHeroesLoading]="relatedHeroesLoading$ | async"
      [@slideInOut]="sidebarState$ | async"
      [hero]="selectedHero$ | async"
      [relatedHeroes]="relatedHeroes$ | async"
      (closeSidebar)="handleCloseSidebar()"
      (selectHero)="handleSelectHero($event)"></mshb-sidebar>

    <div *ngIf="loadingNewHeroes$ | async" class="loading-indicator-container"><mshb-loading-indicator [scale]="2"></mshb-loading-indicator></div>
  `
})
export class HeroesPage implements OnInit {
  heroes$: Observable<Hero[]> = this.heroesService.heroes$;
  selectedHero$: Observable<Hero> = this.heroesService.selectedHero$;
  heroesLoaded$: Observable<boolean> = this.heroesService.heroesLoaded$;
  loadingNewHeroes$: Observable<boolean> = this.heroesService.loadingNewHeroes$;

  relatedHeroes$: Observable<Hero[]> = this.relatedHeroesService.relatedHeroes$;
  relatedHeroesLoading$: Observable<boolean> = this.relatedHeroesService.relatedHeroesLoading$;

  sidebarState$: Observable<string> = this.selectedHero$.map((hero: Hero) => (hero ? 'in' : 'out'));
  searchTerm$ = new Subject<string>();

  constructor(private heroesService: HeroesService, private relatedHeroesService: RelatedHeroesService) {}

  ngOnInit() {
    this.heroesService.watchHeroes(this.searchTerm$);
    this.relatedHeroesService.watchRelatedHeroes(this.selectedHero$);
  }

  handleSelectHero(hero: Hero) {
    this.heroesService.selectHero(hero);
  }

  handleCloseSidebar() {
    this.heroesService.resetSelectedHero();
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../models';

@Component({
  selector: 'mshb-sidebar',
  styleUrls: ['./styles.scss'],
  template: `
    <div *ngIf="hero">
    <div class="close-btn" (click)="closeSidebar.emit()">&times;</div>
    <div class="hero-image" [style.backgroundImage]="url"></div>
    <div class="hero-description">{{ hero.description || 'No Description' }}</div>
    <div class="related-heroes-title">RELATED HEROES:</div>
    <div class="related-heroes-container ">
      <div *ngIf="relatedHeroesLoading" class="no-related-heroes"><mshb-loading-indicator [scale]="7"></mshb-loading-indicator></div>
      <div *ngIf="!relatedHeroesLoading && !relatedHeroes.length" class="no-related-heroes">No related heroes</div>
      <img
        (click)="selectHero.emit(relatedHero)"
        *ngFor="let relatedHero of relatedHeroes"
        class="related-hero-image"
        [src]="relatedHero?.thumbnail.path + '.' + relatedHero?.thumbnail.extension" />
    </div>
    <div
      class="button-container">
      <mshb-button [disabled]="relatedHeroesLoading" title="More Details"></mshb-button>
    </div>
    </div>
  `
})
export class SidebarComponent {
  @Input() hero: Hero;
  @Input() relatedHeroes: Hero[];
  @Input() relatedHeroesLoading: boolean = true;
  @Output() closeSidebar: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectHero: EventEmitter<Hero> = new EventEmitter<Hero>();

  get url() {
    return `url(${this.hero.thumbnail.path}/portrait_incredible.${this.hero.thumbnail.extension})`;
  }

  get name() {
    return this.hero.name.replace(/\(.+/, '').trim();
  }
}

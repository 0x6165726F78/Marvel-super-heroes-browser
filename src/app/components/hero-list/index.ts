import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from '../../models';

// TODO: VIRTUAL LIST PLZ (ಥ﹏ಥ)

@Component({
  selector: 'mshb-hero-list',
  styleUrls: ['./styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #loadingIndicator>
      <div class="loading-container">
        <mshb-loading-indicator [scale]="12"></mshb-loading-indicator>
      </div>
    </ng-template>

  <div
    *ngIf="heroes.length; else loadingIndicator"
    class="hero-list"
    infiniteScroll
    [infiniteScrollDistance]="1"
    [infiniteScrollThrottle]="600"
    (scrolled)="scroll.emit()">

    <mshb-hero-card
      [selected]="hero.id === selectedHero?.id"
      *ngFor="let hero of heroes"
      [hero]="hero"
      (click)="selectHero.emit(hero)"></mshb-hero-card>

  </div>
  `
})
export class HeroListComponent {
  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;
  @Output() scroll: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectHero: EventEmitter<Hero> = new EventEmitter<Hero>();
}

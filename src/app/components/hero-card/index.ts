import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Hero } from '../../models';

@Component({
  selector: 'mshb-hero-card',
  styleUrls: ['./styles.scss'],
  template: `
    <div
      [style.backgroundImage]="url"
      class="hero-card"
      [class.hero-card-selected]="selected"
      [class.hero-card-no-border]="!showBorder">

      <div
        *ngIf="showOverlay"
        class="hero-card-overlay"
        [class.hero-card-overlay-selected]="selected">

        <span
          *ngIf="showName"
          class="hero-name"
          [class.hero-name-selected]="selected"> {{ name }} </span>

      </div>

    </div>

`
})
export class HeroCardComponent implements OnInit {
  @HostBinding('style.transform') dimension: string;
  @Input() hero: Hero;
  @Input() scale: string = '1';
  @Input() showName: boolean = true;
  @Input() showOverlay: boolean = true;
  @Input() showBorder: boolean = true;
  @Input() selected: boolean = false;

  get url() {
    return `url(${this.hero.thumbnail.path}/portrait_incredible.${this.hero.thumbnail.extension})`;
  }

  get name() {
    return this.hero.name.replace(/\(.+/, '').trim();
  }

  ngOnInit() {
    this.dimension = `scale(${this.scale})`;
  }
}

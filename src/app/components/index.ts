import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { HeroCardComponent } from './hero-card';
import { HeroListComponent } from './hero-list';
import { LoadingIndicatorComponent } from './loading-indicator';
import { SearchInputComponent } from './search-input';
import { SidebarComponent } from './sidebar';
import { ButtonComponent } from './button';

export const COMPONENTS = [
  HeroCardComponent,
  HeroListComponent,
  LoadingIndicatorComponent,
  SearchInputComponent,
  SidebarComponent,
  ButtonComponent
];

@NgModule({
  imports: [CommonModule, InfiniteScrollModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {}

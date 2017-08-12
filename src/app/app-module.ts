import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ComponentsModule } from './components';
import { AppComponent } from './app-component';
import { HeroesPage } from './pages';

import { routes } from './routes';
import { HeroesService, RelatedHeroesService } from './services';
import { reducer } from './reducers';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    ComponentsModule,
    FormsModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    BrowserAnimationsModule
  ],
  declarations: [AppComponent, HeroesPage],
  providers: [HeroesService, RelatedHeroesService],
  bootstrap: [AppComponent]
})
export class AppModule {}

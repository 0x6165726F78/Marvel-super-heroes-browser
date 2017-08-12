import { Component } from '@angular/core';

@Component({
  selector: 'mshb-app',
  styleUrls: ['./app-component.scss'],
  template: `
    <nav class="navbar">
      <span class="navbar-brand">Marvel Super Heroes Browser</span>
    </nav>

    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}

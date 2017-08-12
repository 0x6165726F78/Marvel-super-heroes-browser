import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'mshb-search-input',
  styleUrls: ['./styles.scss'],
  template: `
    <input (keyup)="search.emit($event.target.value)" placeholder="{{ placeholder }}" [disabled]="!isReady">
    <mshb-loading-indicator *ngIf="loading"></mshb-loading-indicator>
  `
})
export class SearchInputComponent {
  @Input() placeholder: string;
  @Input() isReady: boolean = false;
  @Input() loading: boolean = false;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
}

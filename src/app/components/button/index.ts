import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mshb-button',
  styleUrls: ['./styles.scss'],
  template: `
    <div
      *ngIf="title"
      class="mshb-button"
      [class.mshb-button-disabled]="disabled"
      (click)="!disabled && this.bClick.emit()"> {{ title }} </div>
  `
})
export class ButtonComponent {
  @Input() title: string;
  @Input() disabled: boolean = true;
  @Output() bClick: EventEmitter<void> = new EventEmitter<void>();
}

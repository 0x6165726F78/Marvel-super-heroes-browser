import { Component, Input } from '@angular/core';

@Component({
  selector: 'mshb-loading-indicator',
  styleUrls: ['./styles.scss'],
  template: `
    <span
      class="glyphicon glyphicon-refresh glyphicon-refresh-animate"
      [style.fontSize.em]="scale"
      [style.color]="color"></span>
  `
})
export class LoadingIndicatorComponent {
  @Input() scale: number;
  @Input() color: string;
}

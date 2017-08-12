import { trigger, state, style, transition, animate } from '@angular/animations';

export const animations = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        transform: 'translate3d(0, 0, 0)'
      })
    ),
    state(
      'out',
      style({
        transform: 'translate3d(100%, 0, 0)'
      })
    ),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
  ])
];

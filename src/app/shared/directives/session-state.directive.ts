import { Directive, HostBinding, Input } from '@angular/core';
@Directive({ selector: '[appSessionState]' })
export class SessionStateDirective {
  @Input() appSessionState = 'planned';
  @HostBinding('class.is-completed') get completed() {
    return this.appSessionState === 'completed';
  }
}

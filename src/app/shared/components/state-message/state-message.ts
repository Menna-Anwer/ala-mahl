import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-state-message',
  template: `<section class="state" [attr.role]="error ? 'alert' : 'status'">
    <i
      class="fa-solid"
      [class]="error ? 'fa-solid fa-circle-exclamation' : 'fa-solid fa-seedling'"
      aria-hidden="true"
    ></i>
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <ng-content />
  </section>`,
  styles: [
    `
      .state {
        text-align: center;
        padding: 45px 20px;
        background: #fff;
        border: 1px dashed #c9c2bd;
        border-radius: 14px;
      }
      .state i {
        font-size: 28px;
        color: #417e6b;
      }
      .state h2 {
        font-size: 20px;
        margin: 16px 0;
      }
      .state p {
        color: #625a58;
      }
    `,
  ],
})
export class StateMessage {
  @Input() title = '';
  @Input() message = '';
  @Input() error = false;
}

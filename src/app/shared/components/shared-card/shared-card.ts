import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.html',
  styleUrl: './shared-card.scss',
})
export class SharedCard {
  @Input() title = '';
}

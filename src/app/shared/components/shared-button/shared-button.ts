import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, Params } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-shared-button',
  imports: [MatButtonModule, RouterLink, NgTemplateOutlet],
  templateUrl: './shared-button.html',
  styleUrl: './shared-button.scss',
})
export class SharedButton {
  @Input() route: string | any[] | null = null;
  @Input() queryParams: Params | null = null;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() secondary = false;
  @Input() icon = '';
}

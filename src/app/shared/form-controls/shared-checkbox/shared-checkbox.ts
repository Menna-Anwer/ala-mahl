import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-shared-checkbox',
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './shared-checkbox.html',
})
export class SharedCheckbox {
  @Input({ required: true }) control!: FormControl<boolean>;
  @Input() label = '';
}

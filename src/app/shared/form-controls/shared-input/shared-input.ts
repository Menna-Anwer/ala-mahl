import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-shared-input',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './shared-input.html',
  styleUrl: './shared-input.scss',
})
export class SharedInput {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() fieldId = '';
  @Input() type = 'text';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
}

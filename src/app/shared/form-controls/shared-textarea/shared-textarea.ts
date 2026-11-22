import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-shared-textarea',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './shared-textarea.html',
  styleUrl: './shared-textarea.scss',
})
export class SharedTextarea {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() fieldId = '';
}

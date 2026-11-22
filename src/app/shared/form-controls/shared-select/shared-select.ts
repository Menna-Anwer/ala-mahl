import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SelectOption } from '../../../core/models/planner.model';
@Component({
  selector: 'app-shared-select',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './shared-select.html',
  styleUrl: './shared-select.scss',
})
export class SharedSelect {
  @Input({ required: true }) control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() fieldId = '';
  @Input() options: SelectOption[] = [];
}

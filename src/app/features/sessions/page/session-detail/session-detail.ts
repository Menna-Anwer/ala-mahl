import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedCheckbox } from '../../../../shared/form-controls/shared-checkbox/shared-checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PlannerService } from '../../../../core/services/planner.service';
import { SharedButton } from '../../../../shared/components/shared-button/shared-button';
import { SharedCard } from '../../../../shared/components/shared-card/shared-card';
import { SharedTextarea } from '../../../../shared/form-controls/shared-textarea/shared-textarea';
import { StateMessage } from '../../../../shared/components/state-message/state-message';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
@Component({
  selector: 'app-session-detail',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SharedCheckbox,
    MatDialogModule,
    SharedButton,
    SharedCard,
    SharedTextarea,
    StateMessage,
    DurationPipe,
  ],
  templateUrl: './session-detail.html',
  styleUrl: './session-detail.scss',
})
export class SessionDetail {
  readonly store = inject(PlannerService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id')!;
  readonly session = computed(() => this.store.sessions().find((s) => s.id === this.id));
  readonly topic = computed(
    () => this.store.topics().find((t) => t.id === this.session()?.topicId)?.title ?? '',
  );
  readonly message = signal('');
  private loaded = false;
  readonly form = new FormGroup({
    understood: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(2000)],
    }),
    question: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(2000)] }),
    completed: new FormControl(false, { nonNullable: true }),
    needsReview: new FormControl(false, { nonNullable: true }),
  });
  constructor() {
    effect(() => {
      const s = this.session();
      if (s && !this.loaded) {
        this.form.patchValue({ ...s, completed: s.status === 'completed' });
        this.loaded = true;
      }
    });
  }
  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.store.saving()) return;
    try {
      const v = this.form.getRawValue();
      await this.store.saveSession(
        {
          understood: v.understood,
          question: v.question,
          status: v.completed ? 'completed' : 'planned',
          needsReview: v.needsReview,
          reviewed: v.needsReview ? false : (this.session()?.reviewed ?? false),
        },
        this.id,
      );
      this.message.set('الملخص اتحفظ. تقدري ترجعي له في أي وقت.');
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
  remove() {
    this.dialog
      .open(ConfirmDialog, { width: '420px', maxWidth: '95vw', direction: 'rtl' })
      .afterClosed()
      .subscribe(async (yes) => {
        if (yes) {
          try {
            await this.store.deleteSession(this.id);
            await this.router.navigate(['/week']);
          } catch (e) {
            this.message.set((e as Error).message);
          }
        }
      });
  }
}

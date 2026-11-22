import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlannerService } from '../../../../core/services/planner.service';
import { SharedButton } from '../../../../shared/components/shared-button/shared-button';
import { SharedCard } from '../../../../shared/components/shared-card/shared-card';
import { SharedInput } from '../../../../shared/form-controls/shared-input/shared-input';
import { SharedSelect } from '../../../../shared/form-controls/shared-select/shared-select';
import { SharedTextarea } from '../../../../shared/form-controls/shared-textarea/shared-textarea';
import { StateMessage } from '../../../../shared/components/state-message/state-message';
import { localDate } from '../../../../shared/util/date.util';
@Component({
  selector: 'app-session-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SharedButton,
    SharedCard,
    SharedInput,
    SharedSelect,
    SharedTextarea,
    StateMessage,
  ],
  templateUrl: './session-form.html',
  styleUrl: './session-form.scss',
})
export class SessionForm {
  readonly store = inject(PlannerService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly id = this.route.snapshot.paramMap.get('id');
  readonly message = signal('');
  private loaded = false;
  readonly options = computed(() =>
    this.store
      .topics()
      .filter((t) => !t.archived || t.id === this.form.controls.topicId.value)
      .map((t) => ({ value: t.id, label: t.title + (t.archived ? ' (مؤرشف)' : '') })),
  );
  readonly kinds = [
    { value: 'قراءة', label: 'قراءة' },
    { value: 'تطبيق', label: 'تطبيق' },
    { value: 'مراجعة', label: 'مراجعة' },
  ];
  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100), Validators.pattern(/.*\S.*/)],
    }),
    topicId: new FormControl(this.route.snapshot.queryParamMap.get('topic') ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl(localDate(), {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
    }),
    minutes: new FormControl(30, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(5),
        Validators.max(480),
        Validators.pattern(/^\d+$/),
      ],
    }),
    kind: new FormControl('تطبيق', { nonNullable: true, validators: [Validators.required] }),
    task: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(1000)] }),
  });
  constructor() {
    effect(() => {
      const data = this.store.sessions();
      if (this.id && !this.loaded) {
        const s = data.find((s) => s.id === this.id);
        if (s) {
          this.form.patchValue(s);
          this.loaded = true;
        }
      }
    });
  }
  get missing() {
    return (
      !!this.id && !this.store.loading() && !this.store.sessions().some((s) => s.id === this.id)
    );
  }
  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.store.saving()) return;
    if (!this.store.topics().some((t) => t.id === this.form.controls.topicId.value)) {
      this.message.set('اختاري موضوعًا موجودًا.');
      return;
    }
    try {
      const data = this.form.getRawValue();
      await this.store.saveSession(
        this.id
          ? data
          : {
              ...data,
              status: 'planned',
              understood: '',
              question: '',
              needsReview: false,
              reviewed: false,
            },
        this.id ?? undefined,
      );
      await this.router.navigate(['/week']);
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
}

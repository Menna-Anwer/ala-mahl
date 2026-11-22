import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlannerService } from '../../../../core/services/planner.service';
import { Topic } from '../../../../core/models/planner.model';
import { SharedButton } from '../../../../shared/components/shared-button/shared-button';
import { SharedCard } from '../../../../shared/components/shared-card/shared-card';
import { SharedInput } from '../../../../shared/form-controls/shared-input/shared-input';
import { SharedTextarea } from '../../../../shared/form-controls/shared-textarea/shared-textarea';
import { StateMessage } from '../../../../shared/components/state-message/state-message';
@Component({
  selector: 'app-topics',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    SharedButton,
    SharedCard,
    SharedInput,
    SharedTextarea,
    StateMessage,
  ],
  templateUrl: './topics.html',
  styleUrl: './topics.scss',
})
export class Topics {
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly store = inject(PlannerService);
  readonly archived = signal(false);
  readonly search = signal('');
  readonly editing = signal<string | null>(null);
  readonly formOpen = signal(false);
  readonly message = signal('');
  readonly selected = signal<string | null>(null);
  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(80), Validators.pattern(/.*\S.*/)],
    }),
    goal: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(300)] }),
  });
  readonly filtered = computed(() =>
    this.store
      .topics()
      .filter(
        (t) =>
          t.archived === this.archived() &&
          t.title.toLowerCase().includes(this.search().toLowerCase()),
      ),
  );
  readonly current = computed(() => this.store.topics().find((t) => t.id === this.selected()));
  sessions(id: string) {
    return this.store.sessions().filter((s) => s.topicId === id);
  }
  open(topic?: Topic) {
    this.editing.set(topic?.id ?? null);
    this.form.reset({ title: topic?.title ?? '', goal: topic?.goal ?? '' });
    this.message.set('');
    this.formOpen.set(true);
  }
  async save() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.store.saving()) return;
    try {
      await this.store.saveTopic(
        {
          ...this.form.getRawValue(),
          archived: this.editing()
            ? this.store.topics().find((t) => t.id === this.editing())!.archived
            : false,
        },
        this.editing() ?? undefined,
      );
      this.formOpen.set(false);
      this.message.set('الموضوع اتحفظ.');
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
  async toggle(topic: Topic) {
    try {
      await this.store.saveTopic({ archived: !topic.archived }, topic.id);
      this.message.set(topic.archived ? 'الموضوع رجع للنشطة.' : 'الموضوع اتأرشف، وجلساته محفوظة.');
      this.selected.set(null);
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
}

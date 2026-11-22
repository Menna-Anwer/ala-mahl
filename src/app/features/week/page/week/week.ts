import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlannerService } from '../../../../core/services/planner.service';
import { SharedButton } from '../../../../shared/components/shared-button/shared-button';
import { StateMessage } from '../../../../shared/components/state-message/state-message';
import { SharedInput } from '../../../../shared/form-controls/shared-input/shared-input';
import { SessionCard } from '../../../sessions/components/session-card/session-card';
import { localDate, weekDays } from '../../../../shared/util/date.util';
@Component({
  selector: 'app-week',
  imports: [
    DatePipe,
    RouterLink,
    ReactiveFormsModule,
    SharedButton,
    StateMessage,
    SharedInput,
    SessionCard,
  ],
  templateUrl: './week.html',
  styleUrl: './week.scss',
})
export class Week {
  readonly store = inject(PlannerService);
  readonly anchor = signal(new Date());
  readonly days = computed(() => weekDays(this.anchor()));
  readonly status = signal('all');
  readonly query = signal('');
  readonly search = new FormControl('', { nonNullable: true });
  readonly weekSessions = computed(() =>
    this.store.sessions().filter((s) => this.days().some((d) => localDate(d) === s.date)),
  );
  readonly done = computed(
    () => this.weekSessions().filter((s) => s.status === 'completed').length,
  );
  readonly review = computed(() => this.store.sessions().filter((s) => s.needsReview).length);
  changeWeek(delta: number) {
    const d = new Date(this.anchor());
    d.setDate(d.getDate() + delta * 7);
    this.anchor.set(d);
  }
  today() {
    this.anchor.set(new Date());
  }
  sessionsFor(date: Date) {
    return this.weekSessions().filter(
      (s) =>
        s.date === localDate(date) &&
        (this.status() === 'all' || s.status === this.status()) &&
        `${s.title} ${this.topic(s.topicId)}`.toLowerCase().includes(this.query().toLowerCase()),
    );
  }
  topic(id: string) {
    return this.store.topics().find((t) => t.id === id)?.title ?? 'موضوع مؤرشف';
  }
}

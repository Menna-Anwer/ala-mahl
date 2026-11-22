import { Component, computed, inject, signal } from '@angular/core';

import { PlannerService } from '../../../../core/services/planner.service';
import { SharedButton } from '../../../../shared/components/shared-button/shared-button';
import { SharedCard } from '../../../../shared/components/shared-card/shared-card';
import { StateMessage } from '../../../../shared/components/state-message/state-message';
@Component({
  selector: 'app-review',
  imports: [SharedButton, SharedCard, StateMessage],
  templateUrl: './review.html',
  styleUrl: './review.scss',
})
export class Review {
  readonly mode = signal<'pending' | 'reviewed'>('pending');
  readonly store = inject(PlannerService);
  readonly message = signal('');
  readonly items = computed(() =>
    this.store
      .sessions()
      .filter((s) => (this.mode() === 'pending' ? s.needsReview : !s.needsReview && s.reviewed)),
  );
  topic(id: string) {
    return this.store.topics().find((t) => t.id === id)?.title ?? '';
  }
  async done(id: string) {
    try {
      await this.store.saveSession({ needsReview: false, reviewed: true }, id);
      this.message.set('المراجعة اتسجلت. الملاحظة لسه محفوظة في الجلسة.');
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
}

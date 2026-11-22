import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudySession } from '../../../../core/models/planner.model';
import { DurationPipe } from '../../../../shared/pipes/duration.pipe';
import { SessionStatusPipe } from '../../../../shared/pipes/session-status.pipe';
import { SessionStateDirective } from '../../../../shared/directives/session-state.directive';
@Component({
  selector: 'app-session-card',
  imports: [RouterLink, DurationPipe, SessionStatusPipe, SessionStateDirective],
  templateUrl: './session-card.html',
  styleUrl: './session-card.scss',
})
export class SessionCard {
  @Input({ required: true }) session!: StudySession;
  @Input() topic = '';
}

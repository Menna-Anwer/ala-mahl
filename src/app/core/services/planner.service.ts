import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin, timeout } from 'rxjs';
import { Topic, StudySession } from '../models/planner.model';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class PlannerService {
  private readonly http = inject(HttpClient);
  readonly topics = signal<Topic[]>([]);
  readonly sessions = signal<StudySession[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly saving = signal(false);
  private url(path: string) {
    return `${environment.apiUrl}/${path}`;
  }
  async load() {
    this.loading.set(true);
    this.error.set('');
    try {
      const data = await firstValueFrom(
        forkJoin({
          topics: this.http.get<Topic[]>(this.url('topics')),
          sessions: this.http.get<StudySession[]>(this.url('sessions')),
        }).pipe(timeout(8000)),
      );
      this.topics.set(data.topics);
      this.sessions.set(data.sessions);
    } catch {
      this.error.set('تعذّر تحميل البيانات. اتأكدي إن JSON Server شغّال وجربي تاني.');
    } finally {
      this.loading.set(false);
    }
  }
  async saveTopic(topic: Partial<Topic>, id?: string) {
    const saved = await this.write<Topic>(
      id
        ? this.http.patch<Topic>(this.url(`topics/${id}`), topic)
        : this.http.post<Topic>(this.url('topics'), topic),
    );
    this.topics.update((items) =>
      id ? items.map((t) => (t.id === id ? saved : t)) : [...items, saved],
    );
  }
  async saveSession(session: Partial<StudySession>, id?: string) {
    const saved = await this.write<StudySession>(
      id
        ? this.http.patch<StudySession>(this.url(`sessions/${id}`), session)
        : this.http.post<StudySession>(this.url('sessions'), session),
    );
    this.sessions.update((items) =>
      id ? items.map((s) => (s.id === id ? saved : s)) : [...items, saved],
    );
  }
  async deleteSession(id: string) {
    await this.write(this.http.delete(this.url(`sessions/${id}`)));
    this.sessions.update((items) => items.filter((s) => s.id !== id));
  }
  private async write<T>(request: import('rxjs').Observable<T>): Promise<T> {
    this.saving.set(true);
    try {
      return await firstValueFrom(request.pipe(timeout(8000)));
    } catch {
      throw new Error('الحفظ ما تمّش. بياناتك لسه في الفورم، جربي تاني.');
    } finally {
      this.saving.set(false);
    }
  }
}

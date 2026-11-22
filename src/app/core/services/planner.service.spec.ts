import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PlannerService } from './planner.service';
const topic = { id: 't1', title: 'Forms', goal: 'test', archived: false };
beforeEach(() => TestBed.resetTestingModule());
describe('PlannerService HTTP and state', () => {
  let service: PlannerService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PlannerService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('loads the two resources together', async () => {
    const p = service.load();
    http.expectOne('http://localhost:3000/topics').flush([topic]);
    http.expectOne('http://localhost:3000/sessions').flush([]);
    await p;
    expect(service.topics()).toEqual([topic]);
    expect(service.loading()).toBe(false);
  });
  it('keeps existing data and exposes load failure', async () => {
    service.topics.set([topic]);
    const p = service.load();
    http.expectOne('http://localhost:3000/sessions');
    http
      .expectOne('http://localhost:3000/topics')
      .flush('failed', { status: 500, statusText: 'Error' });
    await p;
    expect(service.topics()).toEqual([topic]);
    expect(service.error()).toContain('تعذّر');
    expect(service.loading()).toBe(false);
  });
  it('adds only the server-confirmed topic', async () => {
    const p = service.saveTopic({ title: 'Forms', goal: 'test', archived: false });
    expect(service.topics()).toEqual([]);
    http.expectOne('http://localhost:3000/topics').flush(topic);
    await p;
    expect(service.topics()).toEqual([topic]);
    expect(service.saving()).toBe(false);
  });
  it('does not silently remove a session when delete fails', async () => {
    const s = {
      id: 's1',
      topicId: 't1',
      title: 'Study',
      date: '2026-11-21',
      minutes: 30,
      kind: 'تطبيق',
      task: '',
      status: 'planned' as const,
      understood: '',
      question: '',
      needsReview: false,
    };
    service.sessions.set([s]);
    const p = service.deleteSession('s1');
    const check = expect(p).rejects.toThrow('الحفظ');
    http
      .expectOne('http://localhost:3000/sessions/s1')
      .flush('failed', { status: 500, statusText: 'Error' });
    await check;
    expect(service.sessions()).toHaveLength(1);
    expect(service.saving()).toBe(false);
  });
});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { SessionForm } from './session-form';
beforeEach(() => TestBed.resetTestingModule());
describe('session form validation', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SessionForm],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({}), queryParamMap: convertToParamMap({}) },
          },
        },
      ],
    }),
  );
  it('requires a title, topic and valid integer duration', () => {
    const f = TestBed.createComponent(SessionForm).componentInstance;
    expect(f.form.invalid).toBe(true);
    f.form.controls.title.setValue('Practice');
    f.form.controls.topicId.setValue('t1');
    for (const bad of [0, 4, 481, 2.5]) {
      f.form.controls.minutes.setValue(bad);
      expect(f.form.controls.minutes.invalid).toBe(true);
    }
    f.form.controls.minutes.setValue(30);
    expect(f.form.valid).toBe(true);
    f.form.controls.title.setValue('   ');
    expect(f.form.invalid).toBe(true);
  });
});

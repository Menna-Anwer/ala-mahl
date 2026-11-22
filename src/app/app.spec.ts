import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { PlannerService } from './core/services/planner.service';
beforeEach(() => TestBed.resetTestingModule());
describe('App shell', () => {
  it('renders the navigation and starts one data load', () => {
    const load = vi.fn();
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: PlannerService, useValue: { load } }],
    });
    const f = TestBed.createComponent(App);
    f.detectChanges();
    expect(load).toHaveBeenCalledOnce();
    expect(f.nativeElement.querySelector('nav').textContent).toContain('على مهل');
    expect(f.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});

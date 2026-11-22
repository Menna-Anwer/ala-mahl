import { DurationPipe } from './duration.pipe';
import { SessionStatusPipe } from './session-status.pipe';
describe('display pipes', () => {
  it('formats minutes and mixed hours', () => {
    const p = new DurationPipe();
    expect(p.transform(25)).toBe('25 دقيقة');
    expect(p.transform(90)).toBe('1 ساعة و30 دقيقة');
    expect(p.transform(60)).toBe('1 ساعة');
  });
  it('maps session state', () => {
    expect(new SessionStatusPipe().transform('completed')).toBe('مكتملة');
    expect(new SessionStatusPipe().transform('planned')).toBe('مخططة');
  });
});

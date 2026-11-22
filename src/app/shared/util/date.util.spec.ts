import { localDate, weekDays } from './date.util';
describe('local calendar dates', () => {
  it('starts weeks on Saturday and includes seven dates', () => {
    const days = weekDays(new Date(2026, 10, 23));
    expect(days).toHaveLength(7);
    expect(localDate(days[0])).toBe('2026-11-21');
    expect(localDate(days[6])).toBe('2026-11-27');
  });
  it('keeps a local date without UTC conversion', () => {
    expect(localDate(new Date(2026, 0, 1, 0, 5))).toBe('2026-01-01');
  });
});

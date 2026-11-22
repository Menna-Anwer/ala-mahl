import { SessionStateDirective } from './session-state.directive';
describe('SessionStateDirective', () => {
  it('only marks completed sessions', () => {
    const d = new SessionStateDirective();
    expect(d.completed).toBe(false);
    d.appSessionState = 'completed';
    expect(d.completed).toBe(true);
  });
});

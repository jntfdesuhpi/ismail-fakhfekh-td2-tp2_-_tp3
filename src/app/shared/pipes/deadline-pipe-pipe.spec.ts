import { DeadlinePipePipe } from './deadline-pipe-pipe';

describe('DeadlinePipePipe', () => {
  it('create an instance', () => {
    const pipe = new DeadlinePipePipe();
    expect(pipe).toBeTruthy();
  });

  it('describes deadlines relative to today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 27, 12));
    const pipe = new DeadlinePipePipe();

    expect(pipe.transform('2026-10-27')).toBe('Aujourd’hui');
    expect(pipe.transform('2026-10-28')).toBe('Demain');
    expect(pipe.transform('2026-10-30')).toBe('Dans 3 jours');
    expect(pipe.transform('2026-10-26')).toBe('En retard de 1 jour');
    expect(pipe.transform('2026-10-22')).toBe('En retard de 5 jours');

    vi.useRealTimers();
  });

  it('returns a message when the deadline is absent', () => {
    const pipe = new DeadlinePipePipe();

    expect(pipe.transform(undefined)).toBe('Pas d’échéance');
    expect(pipe.transform(null)).toBe('Pas d’échéance');
  });
});

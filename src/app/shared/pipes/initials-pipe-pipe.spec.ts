import { InitialsPipePipe } from './initials-pipe-pipe';

describe('InitialsPipePipe', () => {
  it('create an instance', () => {
    const pipe = new InitialsPipePipe();
    expect(pipe).toBeTruthy();
  });

  it('returns uppercase initials from the first two words', () => {
    const pipe = new InitialsPipePipe();

    expect(pipe.transform('Amira Ben Salah')).toBe('AB');
    expect(pipe.transform('karim')).toBe('K');
  });

  it('returns a question mark for absent names', () => {
    const pipe = new InitialsPipePipe();

    expect(pipe.transform(undefined)).toBe('?');
    expect(pipe.transform('   ')).toBe('?');
  });
});

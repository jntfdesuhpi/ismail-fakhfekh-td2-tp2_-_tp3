import { TruncatePipePipe } from './truncate-pipe-pipe';

describe('TruncatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipePipe();
    expect(pipe).toBeTruthy();
  });

  it('truncates long text and trims trailing spaces before the suffix', () => {
    const pipe = new TruncatePipePipe();

    expect(pipe.transform('1234567   next', 10, '...')).toBe('1234567...');
  });

  it('uses the default limit and suffix', () => {
    const pipe = new TruncatePipePipe();
    const text = `${'a'.repeat(50)}  b`;

    expect(pipe.transform(text)).toBe(`${'a'.repeat(50)}...`);
  });

  it('leaves short text unchanged and returns an empty string for absent values', () => {
    const pipe = new TruncatePipePipe();

    expect(pipe.transform('short')).toBe('short');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform(null)).toBe('');
  });
});

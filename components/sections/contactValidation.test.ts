import { describe, it, expect } from 'vitest';
import { validateContact } from './contactValidation';

describe('validateContact (SR-3)', () => {
  it('accepts a well-formed submission', () => {
    const r = validateContact({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello there, this is a proper message.',
    });
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual({});
  });

  it('flags every missing field', () => {
    const r = validateContact({ name: '  ', email: '', message: '' });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBe('nameRequired');
    expect(r.errors.email).toBe('emailRequired');
    expect(r.errors.message).toBe('messageRequired');
  });

  it('rejects a malformed email', () => {
    const r = validateContact({
      name: 'Ada',
      email: 'not-an-email',
      message: 'A sufficiently long message here.',
    });
    expect(r.ok).toBe(false);
    expect(r.errors.email).toBe('emailInvalid');
  });

  it('rejects a too-short message', () => {
    const r = validateContact({ name: 'Ada', email: 'ada@example.com', message: 'hi' });
    expect(r.ok).toBe(false);
    expect(r.errors.message).toBe('messageTooShort');
  });
});

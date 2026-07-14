// Contact form input validation (SR-3, Unit U4).
//
// Pure + framework-free so it is unit-testable and reusable. Error values are i18n keys
// (under `sections.contact.validation.*`) the ContactForm resolves to localized messages.

export type ContactField = 'name' | 'email' | 'message';

export type ContactInput = { name: string; email: string; message: string };

export type ContactValidationResult = {
  ok: boolean;
  errors: Partial<Record<ContactField, string>>;
};

// Pragmatic email shape check (not RFC-perfect on purpose).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  nameMax: 100,
  messageMin: 10,
  messageMax: 5000,
} as const;

export { LIMITS as CONTACT_LIMITS };

/** Validate a contact submission. Returns `ok` plus per-field i18n error keys. */
export function validateContact(input: ContactInput): ContactValidationResult {
  const errors: Partial<Record<ContactField, string>> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) {
    errors.name = 'nameRequired';
  } else if (name.length > LIMITS.nameMax) {
    errors.name = 'nameTooLong';
  }

  if (!email) {
    errors.email = 'emailRequired';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'emailInvalid';
  }

  if (!message) {
    errors.message = 'messageRequired';
  } else if (message.length < LIMITS.messageMin) {
    errors.message = 'messageTooShort';
  } else if (message.length > LIMITS.messageMax) {
    errors.message = 'messageTooLong';
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

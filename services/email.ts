// Typed EmailJS wrapper (Unit U4).
//
// SR-1: reads all EmailJS configuration from `@/lib/env` (env-sourced, no hardcoded keys).
// SR-4: fail-closed — throws a typed error the caller can surface as a HUD alert, and no-ops
// safely (throws) when EmailJS is not configured rather than pretending to send.
//
// EmailJS runs in the browser, so this module is client-safe (no `server-only`).

import emailjs from '@emailjs/browser';
import { env, isEmailConfigured } from '@/lib/env';

export type SendEmailInput = {
  fromName: string;
  fromEmail: string;
  message: string;
};

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('EmailJS is not configured (missing NEXT_PUBLIC_EMAILJS_* env).');
    this.name = 'EmailNotConfiguredError';
  }
}

export class EmailSendError extends Error {
  constructor(cause?: unknown) {
    super('Failed to send email.');
    this.name = 'EmailSendError';
    this.cause = cause;
  }
}

/**
 * Send a contact message via EmailJS. Resolves on success; rejects with a typed error on
 * misconfiguration or transport failure (fail-closed — never resolves on a failed send).
 */
export async function sendEmail(input: SendEmailInput): Promise<void> {
  if (!isEmailConfigured()) {
    throw new EmailNotConfiguredError();
  }

  try {
    await emailjs.send(
      env.emailjs.serviceId,
      env.emailjs.templateId,
      {
        from_name: input.fromName,
        to_name: env.emailjs.toName,
        from_email: input.fromEmail,
        to_email: env.emailjs.toEmail,
        message: input.message,
      },
      env.emailjs.publicKey,
    );
  } catch (err) {
    throw new EmailSendError(err);
  }
}

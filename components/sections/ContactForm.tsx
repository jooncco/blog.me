'use client';

import { useContext, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { HudButton } from '@/components/hud';
import { CheckCircleIcon, ExclamationCircleIcon } from '@/components/Icons';
import { AlertContext } from '@/providers/AlertProvider';
import { sendEmail, EmailNotConfiguredError } from '@/services/email';
import {
  validateContact,
  type ContactField,
  type ContactInput,
} from './contactValidation';

type FieldErrors = Partial<Record<ContactField, string>>;

const EMPTY: ContactInput = { name: '', email: '', message: '' };

/** Validated contact form → EmailJS, with HUD alert feedback (SR-3 / SR-4). */
export function ContactForm() {
  const t = useTranslations('sections');
  const { setAlertState } = useContext(AlertContext);
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const showAlert = (ok: boolean, title: string, content: string, hideAfter = 5000) => {
    setAlertState({
      type: 'SHOW',
      data: {
        icon: ok ? (
          <CheckCircleIcon className="h-7 w-7" />
        ) : (
          <ExclamationCircleIcon className="h-7 w-7" />
        ),
        title,
        content,
      },
    });
    setTimeout(() => setAlertState({ type: 'HIDE' }), hideAfter);
  };

  const setField = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const errorText = (field: ContactField): string | undefined => {
    const key = errors[field];
    return key ? t(`contact.validation.${key}`) : undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      showAlert(false, t('contact.alerts.invalidTitle'), t('contact.alerts.invalidBody'));
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await sendEmail({
        fromName: values.name.trim(),
        fromEmail: values.email.trim(),
        message: values.message.trim(),
      });
      showAlert(true, t('contact.alerts.sentTitle'), t('contact.alerts.sentBody'));
      setValues(EMPTY);
    } catch (err) {
      const body =
        err instanceof EmailNotConfiguredError
          ? t('contact.alerts.notConfiguredBody')
          : t('contact.alerts.errorBody');
      showAlert(false, t('contact.alerts.errorTitle'), body, 9000);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field: ContactField) =>
    clsx(
      'w-full rounded-sm border bg-neutral2/40 px-4 py-3 font-sans text-sm text-text',
      'placeholder:text-text/40 focus:outline-none focus:shadow-glow-cyan',
      errors[field] ? 'border-hud-red/70' : 'border-hud-cyan/30 focus:border-hud-cyan',
    );

  return (
    <form onSubmit={handleSubmit} noValidate data-testid="contact-form" className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-hud-cyan/80">
          {t('contact.name')}
        </span>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder={t('contact.namePlaceholder')}
          aria-invalid={Boolean(errors.name)}
          data-testid="contact-name"
          className={fieldClass('name')}
        />
        {errorText('name') && (
          <span data-testid="error-name" className="font-mono text-xs text-hud-red">
            {errorText('name')}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-hud-cyan/80">
          {t('contact.email')}
        </span>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
          placeholder={t('contact.emailPlaceholder')}
          aria-invalid={Boolean(errors.email)}
          data-testid="contact-email"
          className={fieldClass('email')}
        />
        {errorText('email') && (
          <span data-testid="error-email" className="font-mono text-xs text-hud-red">
            {errorText('email')}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-hud-cyan/80">
          {t('contact.message')}
        </span>
        <textarea
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
          placeholder={t('contact.messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          data-testid="contact-message"
          className={clsx(fieldClass('message'), 'resize-none')}
        />
        {errorText('message') && (
          <span data-testid="error-message" className="font-mono text-xs text-hud-red">
            {errorText('message')}
          </span>
        )}
      </label>

      <HudButton type="submit" variant="solid" size="lg" loading={loading} disabled={loading}>
        {loading ? t('contact.sending') : t('contact.send')}
      </HudButton>
    </form>
  );
}

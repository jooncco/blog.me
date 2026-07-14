import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { AlertProvider } from '@/providers/AlertProvider';
import { ContactForm } from './ContactForm';
import { sendEmail } from '@/services/email';

vi.mock('@/services/email', () => ({
  sendEmail: vi.fn(),
  EmailNotConfiguredError: class EmailNotConfiguredError extends Error {},
  EmailSendError: class EmailSendError extends Error {},
}));

const mockedSend = vi.mocked(sendEmail);

function renderForm() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      <AlertProvider>
        <ContactForm />
      </AlertProvider>
    </NextIntlClientProvider>,
  );
}

describe('ContactForm', () => {
  beforeEach(() => {
    mockedSend.mockReset();
  });

  it('shows inline validation errors and does not send on an empty submit', () => {
    renderForm();
    fireEvent.submit(screen.getByTestId('contact-form'));

    expect(screen.getByTestId('error-name')).toBeInTheDocument();
    expect(screen.getByTestId('error-email')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it('sends a valid submission via the email service', async () => {
    mockedSend.mockResolvedValueOnce(undefined);
    renderForm();

    fireEvent.change(screen.getByTestId('contact-name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByTestId('contact-email'), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByTestId('contact-message'), {
      target: { value: 'This is a genuinely long enough message.' },
    });
    fireEvent.submit(screen.getByTestId('contact-form'));

    await waitFor(() => expect(mockedSend).toHaveBeenCalledTimes(1));
    expect(mockedSend).toHaveBeenCalledWith({
      fromName: 'Ada Lovelace',
      fromEmail: 'ada@example.com',
      message: 'This is a genuinely long enough message.',
    });
  });
});

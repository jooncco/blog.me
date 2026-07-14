'use client';

import { useContext } from 'react';
import { clsx } from 'clsx';
import { AlertContext } from './AlertProvider';
import { HudFrame } from '@/components/hud';
import { XMarkIcon } from '@/components/Icons';

/**
 * Renders the active global alert as a HUD-framed toast (was `AlertWithContent`).
 * Reads `AlertContext`; dispatches HIDE on close.
 */
export function AlertHost() {
  const { alertState, setAlertState } = useContext(AlertContext);

  return (
    <div
      aria-live="polite"
      className={clsx(
        'pointer-events-none fixed inset-x-0 bottom-8 z-[60] flex justify-center px-4',
        'transition-opacity duration-300',
        alertState.open ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}>
      {alertState.open && (
        <HudFrame
          variant="panel"
          glow="cyan"
          className="pointer-events-auto w-full max-w-md p-4">
          <div className="flex items-start gap-3" role="alert" data-testid="alert-host">
            {alertState.icon && (
              <span className="mt-0.5 shrink-0 text-hud-cyan">{alertState.icon}</span>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-bold uppercase tracking-wider text-text">
                {alertState.title}
              </p>
              <p className="mt-1 font-sans text-sm text-text/80">{alertState.content}</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              data-testid="alert-close"
              onClick={() => setAlertState({ type: 'HIDE' })}
              className="shrink-0 rounded-sm p-1 text-text/60 transition-colors hover:text-hud-cyan">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </HudFrame>
      )}
    </div>
  );
}

export default AlertHost;

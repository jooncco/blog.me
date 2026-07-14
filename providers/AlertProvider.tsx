'use client';

import { createContext, useReducer, type Dispatch, type ReactNode } from 'react';

/** Active alert descriptor. `icon` is an arbitrary React node (e.g. a HUD icon). */
export type AlertState = {
  open: boolean;
  icon: ReactNode;
  title: string;
  content: string;
};

export type AlertAction =
  | { type: 'SHOW'; data: { icon: ReactNode; title: string; content: string } }
  | { type: 'HIDE' };

export type AlertContextValue = {
  alertState: AlertState;
  setAlertState: Dispatch<AlertAction>;
};

const initialState: AlertState = { open: false, icon: null, title: '', content: '' };

function reducer(state: AlertState, action: AlertAction): AlertState {
  switch (action.type) {
    case 'SHOW':
      return {
        open: true,
        icon: action.data.icon,
        title: action.data.title,
        content: action.data.content,
      };
    case 'HIDE':
      return { ...state, open: false };
    default:
      return state;
  }
}

// Keep the existing context API (`{ alertState, setAlertState }`, SHOW/HIDE)
// so the existing ContactForm keeps working unchanged.
export const AlertContext = createContext<AlertContextValue>({
  alertState: initialState,
  setAlertState: () => undefined,
});

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alertState, setAlertState] = useReducer(reducer, initialState);

  return (
    <AlertContext.Provider value={{ alertState, setAlertState }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;

import { createContext, useContext, useMemo, useState } from 'react';
import { Transition } from '@headlessui/react';
import { v4 as uuid } from 'uuid';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  publish: (message: Omit<ToastMessage, 'id'> & { id?: string }) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const publish: ToastContextValue['publish'] = ({ id, ...message }) => {
    const toastId = id ?? uuid();
    setMessages((prev) => [...prev, { id: toastId, ...message }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((item) => item.id !== toastId));
    }, 5000);
  };

  const value = useMemo<ToastContextValue>(() => ({ publish }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2">
        {messages.map((toast) => (
          <Transition
            key={toast.id}
            show
            appear
            enter="transform transition ease-out duration-200"
            enterFrom="translate-y-2 opacity-0 scale-95"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="w-full max-w-md"
          >
            <div
              className={
                'rounded-lg border bg-white px-4 py-3 shadow-lg ring-1 ring-black/5 ' +
                toastVariantStyles(toast.variant)
              }
            >
              <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
              {toast.description ? (
                <p className="mt-1 text-sm text-slate-600">{toast.description}</p>
              ) : null}
            </div>
          </Transition>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const toastVariantStyles = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return 'border-green-200 bg-green-50 text-green-900';
    case 'error':
      return 'border-red-200 bg-red-50 text-red-900';
    case 'warning':
      return 'border-yellow-200 bg-yellow-50 text-yellow-900';
    default:
      return 'border-slate-200 bg-white text-slate-900';
  }
};

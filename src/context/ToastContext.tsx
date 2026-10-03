import {
  IToast,
  IToastContextData,
  IToastProviderProps,
} from "@/interfaces/ui/IUiToast";
import { ToastType } from "@/types/Toast";
import { createContext, useContext, useState } from "react";

const ToastContext = createContext<IToastContextData | undefined>(undefined);

export function ToastProvider({ children }: IToastProviderProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  function addToast(message: string, type: ToastType) {
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id,
        message,
        type,
      },
    ]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }

  function showSuccess(message: string) {
    addToast(message, "success");
  }

  function showError(message: string) {
    addToast(message, "error");
  }

  function removeToast(id: string) {
    setToasts((currentToasts) =>
      currentToasts.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              leaving: true,
            }
          : toast,
      ),
    );

    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      );
    }, 300);
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showSuccess,
        showError,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider.");
  }

  return context;
}

import { ToastType } from "@/types/Toast";
import { ReactNode } from "react";

export interface IToast {
  id: string;
  message: string;
  type: ToastType;
  leaving?: boolean;
}

export interface IToastContainerProps {
  toasts: IToast[];
  onClose: (id: string) => void;
}

export interface IToastItemProps {
  toast: IToast;
  onClose: (id: string) => void;
}

export interface IToastContextData {
  toasts: IToast[];
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  removeToast: (id: string) => void;
}

export interface IToastProviderProps {
  children: ReactNode;
}

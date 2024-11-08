// src/stores/toastStore.ts

import { defineStore } from 'pinia';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  getters: {
    // Define any getters if necessary
  },
  actions: {
    addToast(toast: Omit<Toast, 'id'>) {
      const id = Date.now();
      const duration = toast.duration || 5000;

      this.toasts.push({ ...toast, id });

      // Automatically remove toast after the specified duration
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    },
    removeToast(id: number) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});

import { defineStore } from 'pinia';



export const useSignInPageStore = defineStore('useSignInPageStore', {
  // State
  state: () => ({
    email: '',
    password: '',
    loading: false,
    errors: {} as Record<string, string>,
  }),

  // Actions
  actions: {
    // Validate form fields
    validateForm() {
      this.errors = {};

      if (!this.email.trim()) {
        this.errors.email = 'Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.email = 'Invalid email address.';
      }

      if (!this.password.trim()) {
        this.errors.password = 'Password is required.';
      }

      return Object.keys(this.errors).length === 0;
    },


    // Initialize authentication (e.g., on app startup)
    initializeAuth() {
      
    },
  },
});

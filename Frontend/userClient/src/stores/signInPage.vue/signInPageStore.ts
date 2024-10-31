import { defineStore } from 'pinia';
import {useAuthStore} from "@/stores/authStore/authStore"
import {router} from "@/router"


export const useSignInPageStore = defineStore('useSignInPageStore', {
  // State
  state: () => ({
    email: '',
    password: '',
    loading: false,
    errors: {} as Record<string, string>,
  }),

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
    async initializeAuth(next:string='/') {
      const authStore = useAuthStore()
      try{
        await authStore.requestLogin(this.email, this.password)
        authStore.getProfileData()
        router.push(next)
        useSignInPageStore().$reset()
      }catch(e){
        //nothing to do here
      }
    },
  },
});

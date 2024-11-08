import { defineStore } from 'pinia';
import {useAuthStore} from "@/stores/authStore/authStore"
import {router} from "@/router"
import { noAuthApi } from '@/api';
import { useToastStore } from '../toastStore/toastStore';


export const useSignInPageStore = defineStore('useSignInPageStore', {
  // State
  state: () => ({
    email: '',
    password: '',
    loading: false,
    errors: {} as Record<string, string>,
    resetPasswordEmail: '' as string,
    resetPasswordEmailError: '' as string,
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
    async initializePasswordReset(){
      try{
        this.resetPasswordEmailError = ''
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.resetPasswordEmail)){
          this.resetPasswordEmailError = 'invalid email'
          return
        }

        await noAuthApi.post('/request-password-reset/', {
          email: this.resetPasswordEmail
        })
        useToastStore().addToast({
          type: 'info',
          title: "Check your email",
          message: "we've sent recovery link to your e-mail, follow it to continue."
        })
      }catch(err){
        useToastStore().addToast({
          type: 'error',
          title: "Something went wrong",
          message: "error has occured, is the email you provided correct?"
        })
      }
    }
  },
});

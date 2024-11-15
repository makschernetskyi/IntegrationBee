import { api, noAuthApi } from '@/api';
import { defineStore } from 'pinia';
import { useToastStore } from '../toastStore/toastStore';


export const useSignUpPageStore = defineStore('signUpPageStore', {
	// State
	state: () => ({
		email: '',
		firstName: '',
		lastName: '',
		institution: '',
		password: '',
		isTermsAccepted: false,
		loading: false,
		errors: {} as Record<string, string>,
	}),

  	// Actions
	actions: {
		// Validate form fields
		validateForm() {
			this.errors = {};

			if(!this.isTermsAccepted){
				this.errors.isTermsAccepted = 'This field is required'
			}

			// Email validation
			if (!this.email.trim()) {
				this.errors.email = 'Email is required.';
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
				this.errors.email = 'Invalid email address.';
			}

			// First Name validation
			if (!this.firstName.trim()) {
				this.errors.firstName = 'First Name is required.';
			}

			// Last Name validation
			if (!this.lastName.trim()) {
				this.errors.lastName = 'Last Name is required.';
			}

			// // Institution validation
			// if (!this.institution.trim()) {
			// this.errors.institution = 'Institution is required.';
			// }

			// Password validation
			if (!this.password.trim()) {
				this.errors.password = 'Password is required.';
			} else if (this.password.length < 8) {
				this.errors.password = 'Password must be at least 8 characters long.';
			}

			// Return true if no errors
			return Object.keys(this.errors).length === 0;
		},

		async initializeSignUp(){
			try{
				const request = await noAuthApi.post('/register/', {
					first_name: this.firstName,
					last_name: this.lastName,
					school: this.institution,
					email: this.email,
					password: this.password,
					...(this.institution ? {institution: this.institution} : {})
				})

				useToastStore().addToast({
					type: "info",
					title: "Check your e-mail",
					message: "We sent a message to the e-mail you provided, use the link there to validate your e-mail address",
					duration: 10000,
				})
			}catch(e:any){
				useToastStore().addToast({
					type: "error",
					title: "Error has occured",
					message: "try again later",
					duration: 10000,
				})
				throw e;
			}
		}
	},
});

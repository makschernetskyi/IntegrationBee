import { defineStore } from 'pinia';


export const useSignUpPageStore = defineStore('signUpPageStore', {
	// State
	state: () => ({
		email: '',
		firstName: '',
		lastName: '',
		institution: '',
		password: '',
		loading: false,
		errors: {} as Record<string, string>,
	}),

  	// Actions
	actions: {
		// Validate form fields
		validateForm() {
			this.errors = {};

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

			// Institution validation
			if (!this.institution.trim()) {
			this.errors.institution = 'Institution is required.';
			}

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
			//TODO: call sign up from authstore here
		}
	},
});

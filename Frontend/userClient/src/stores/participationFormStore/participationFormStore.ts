// src/stores/participationFormStore.ts

import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from '@/stores/toastStore/toastStore';

export const useParticipationFormStore = defineStore('participationFormStore', {
  // State
  state: () => ({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emergencyPhoneNumber: '',
    studyProgram: '',
    namePronunciation: null as Blob | null, // Assuming audio is stored as a Blob
    additionalInfo: '',
    acceptedRules: false,
    errors: {} as Record<string, string>,
    loading: false,
  }),

  // Actions
  actions: {
    // Validate form fields and populate errors
    validateForm() {
      this.errors = {};

      if (!this.firstName.trim()) {
        this.errors.firstName = 'First Name is required.';
      }

      if (!this.lastName.trim()) {
        this.errors.lastName = 'Last Name is required.';
      }

      if (!this.phoneNumber.trim()) {
        this.errors.phoneNumber = 'Phone Number is required.';
      } else if (!/^\+?[0-9\s\-()]{7,}$/.test(this.phoneNumber)) {
        this.errors.phoneNumber = 'Invalid phone number format.';
      }

      if (!this.emergencyPhoneNumber.trim()) {
        this.errors.emergencyPhoneNumber = 'Emergency Phone Number is required.';
      } else if (!/^\+?[0-9\s\-()]{7,}$/.test(this.emergencyPhoneNumber)) {
        this.errors.emergencyPhoneNumber = 'Invalid phone number format.';
      }

      if (!this.studyProgram.trim()) {
        this.errors.studyProgram = 'Study Program is required.';
      }

      if(!this.namePronunciation){
        this.errors.namePronunciation = 'Name pronunciation is required';
      }

      //if (!this.acceptedRules) {
      //  this.errors.acceptedRules = 'You must accept the rules of participation.';
      //}

      // Return true if there are no errors
      return Object.keys(this.errors).length === 0;
    },

    // Submit the form data
    async submitForm() {
      const toastStore = useToastStore();

      if (!this.validateForm()) {
        toastStore.addToast({
			type: "error",
			title: 'Please correct the errors in the form',
			message: ''
	 	});
        return;
      }

      this.loading = true;

      try {
        const formData = new FormData();

        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        formData.append('phoneNumber', this.phoneNumber);
        formData.append('emergencyPhoneNumber', this.emergencyPhoneNumber);
        formData.append('studyProgram', this.studyProgram);

        if (this.namePronunciation) {
          formData.append('namePronunciation', this.namePronunciation, 'namePronunciation.wav');
        }

        formData.append('additionalInfo', this.additionalInfo);
        formData.append('acceptedRules', this.acceptedRules.toString());

        const response = await axios.post('/api/participation', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
			toastStore.addToast({
				type: "success",
				title: 'successfully registered',
				message: 'please check your email regularly to see updates'
			 });
          this.resetForm();
        } else {
			toastStore.addToast({
				type: "error",
				title: 'registration failed',
				message: 'please try again later.'
			 });
        }
      } catch (error) {
        console.error('Error submitting participation form:', error);
        toastStore.addToast({
			type: "error",
			title: 'an error has occured',
			message: 'an error has occured while submitting the form'
		 });
      } finally {
        this.loading = false;
      }
    },

    // Reset the form to initial state
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.phoneNumber = '';
      this.emergencyPhoneNumber = '';
      this.studyProgram = '';
      this.namePronunciation = null;
      this.additionalInfo = '';
      this.acceptedRules = false;
      this.errors = {};
    },
  },
});

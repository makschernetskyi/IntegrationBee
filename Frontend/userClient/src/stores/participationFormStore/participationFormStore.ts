import { defineStore } from 'pinia';
import { api } from '@/api';
import { useToastStore } from '@/stores/toastStore/toastStore';
import { useEventPageStore } from '../eventPageStore/eventPageStore';
import { useAuthStore } from '../authStore/authStore';
import { blobToBase64 } from '@/utils/blobToBase64';

export const useParticipationFormStore = defineStore('participationFormStore', {
  // State
  state: () => ({
    phoneNumber: '',
    emergencyPhoneNumber: '',
    studyProgram: '',
    namePronunciation: undefined as Blob | undefined, // Assuming audio is stored as a Blob
    additionalInfo: '',
    acceptedRules: false,
    errors: {} as Record<string, string>,
    loading: false,
  }),

  // Actions
  actions: {
    // Validate form fields and populate errors
    async validateForm() {
      this.errors = {};

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
      }else{
        if(!(await this.checkIfAudioIsUnderNSeconds(this.namePronunciation, 10))){
          this.errors.namePronunciation = 'audio must be under 10 sec';
        }
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

      this.loading = true;

      try {
        console.log("I AM TRYING! REALLY!")
        
        const id = useEventPageStore().competitionId

        console.log("I HAVE EVEN GOT a COMP ID!!!")

        console.log(this.namePronunciation, await blobToBase64(this.namePronunciation as Blob))

        console.log("I got audio")

        const namePronunciationBase64 = await blobToBase64(this.namePronunciation as Blob)

        const response = await api.patch(`/competition/${id}/`, {
          "action": "register",
          "phone_number": this.phoneNumber,
          "emergency_phone_number": this.emergencyPhoneNumber,
          "program_of_study": this.studyProgram,
          "name_pronunciation": namePronunciationBase64,
          "additional_info": this.additionalInfo
        });

        if (response.status === 200) {
          toastStore.addToast({
            type: "success",
            title: 'successfully registered',
            message: 'please check your email regularly to see updates'
          }); 
          this.resetForm();
        }
      } catch (error) {
        toastStore.addToast({
          type: "error",
          title: 'an error has occured',
          message: 'an error has occured while submitting the form'
        });
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Reset the form to initial state
    resetForm() {
      this.phoneNumber = '';
      this.emergencyPhoneNumber = '';
      this.studyProgram = '';
      this.namePronunciation = undefined;
      this.additionalInfo = '';
      this.acceptedRules = false;
      this.errors = {};
    },
    prefillForm(){
      const authStore = useAuthStore()
      authStore.phoneNumber && (this.phoneNumber = authStore.phoneNumber)
      authStore.programOfStudy && (this.studyProgram = authStore.programOfStudy)
    },
    async checkIfAudioIsUnderNSeconds(blob:Blob, sec:number=10){
      const audioContext = new AudioContext();
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const duration = audioBuffer.duration;
      return duration < 10;
    }
  },
});

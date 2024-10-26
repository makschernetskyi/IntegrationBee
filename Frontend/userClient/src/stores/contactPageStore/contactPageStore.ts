import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from '@/stores/toastStore/toastStore'; // Assuming you have a toast store

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageSrc: string;
  tel?: string;
  email?: string;
  linkedin?: string;
}

export const useContactPageStore = defineStore('contactPageStore', {
  state: () => ({
	title: '' as string,
    aboutUsText: '' as string,
    generalInqueriesEmail: '' as string,
    teamMembers: [] as TeamMember[],
    loading: false as boolean,
  }),
  actions: {
    async fetchContactData() {
      this.loading = true;
      try {
        const response = await axios.get('/api/contact'); // Replace with your actual API endpoint
        const data = response.data;
        this.aboutUsText = data.aboutUsText;
        this.generalInqueriesEmail = data.generalInqueriesEmail ;
        this.teamMembers = data.teamMembers;
      } catch (error) {
		const toastStore = useToastStore();
        toastStore.addToast({
			type: 'error',
			title: "Couldn't fetch contacts",
			message: "try again later."
		});
      } finally {
        this.loading = false;
      }
    },
  },
});

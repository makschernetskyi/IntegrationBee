import { defineStore } from 'pinia';
import { useToastStore } from '@/stores/toastStore/toastStore'; // Assuming you have a toast store
import { noAuthApi } from '@/api';
import { fetchImageUrl } from '@/services/fetchImageUrl';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageSrc: string;
  tel?: string;
  email?: string;
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
        const response = await noAuthApi.get('/cms/pages', {
          params: {
            type: "home.ContactsPage",
            fields: "title,about_us,inquiry_email,our_team"
          }
        })
        const data = response.data.items["0"];
        this.title = data.title;
        this.aboutUsText = data.about_us;
        this.generalInqueriesEmail = data.inquiry_email ;

        const processTeamMembers = async () => {
          const members = data.our_team
            .map(async (member:any, i:number) => ({
              id: i,
              name: member.value.name,
              imageSrc: await fetchImageUrl(member.value.picture),
              role: member.value.role,
              ...(member.value.email ? {email: member.value.email} : {}),
              ...(member.value.phone ? {tel: member.value.phone} : {}),
            }));
          return Promise.all(members);
        };

        this.teamMembers = await processTeamMembers();

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

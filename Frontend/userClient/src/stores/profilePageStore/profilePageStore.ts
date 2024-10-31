import { defineStore } from 'pinia';
import { api } from '@/api';
import { useAuthStore } from '../authStore/authStore';
import { useToastStore } from '../toastStore/toastStore';
import { camelToSnake } from '@/utils/camelToSnake';
import { fileToBase64 } from '@/utils/fileToBase64';


type EditableAttribute = 'phoneNumber' | 'institution'| 'programOfStudy';

export const useProfilePageStore = defineStore('profilePageStore', {

  state: () => ({
	phoneNumber: '' as string,
	institution: '' as string,
	programOfStudy: '' as string,
	profilePicture: null as File|null,
    editingField: null as EditableAttribute | null,
  }),

  actions: {
	async updateProfilePicture(){
		if(!this.profilePicture){
			return
		}
		try{
			const base64Picture = await fileToBase64(this.profilePicture)
			await api.put(`/updateUser/`, {'profile_picture': base64Picture });
			await useAuthStore().getProfileData()
		}catch(e){
			useToastStore().addToast({
				type: 'error',
				title: 'Something went wrong',
				message: `could not update profile picture, try again later.`
			})
		}
	},

    async updateProfileField(field: EditableAttribute, value: string) {
      try {
		const pyField = camelToSnake(field)
        await api.put(`/updateUser/`, { [pyField]: value });
		await useAuthStore().getProfileData()
		this.cancelEditing();
      } catch (error) {
        useToastStore().addToast({
			type: 'error',
			title: 'Error has occured',
			message: `could not update profile information. try later`
		})
      }
    },

    startEditing(field: EditableAttribute) {
      this.editingField = field;
	  const authStore = useAuthStore()
	  this[field] = authStore[field] ?? '';
    },

    cancelEditing() {
		if(this.editingField != null)
			this[this.editingField] = '';
      	this.editingField = null;
    },
  },
});

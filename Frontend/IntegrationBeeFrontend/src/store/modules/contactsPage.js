import {defineStore} from "pinia";
import axios from "axios";

import {useErrorStore} from "@/store/modules/error.js";

const API_PAGES_URL = '/api/v2/cms/pages/'

export const useContactsPageStore = defineStore('contactsPage',{
    state: ()=>({
        aboutUs: null,
        contacts: null,
        socials: null,
        teamMembers: [],
        getContactsPageInfoRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        }
    }),
    actions:{
        async getContactsPageInfo() {
            try {
                // Reset the request status before making a new request
                this.getContactsPageInfoRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const response = await axios.get(API_PAGES_URL, {
                    params: {
                        type: "home.ContactsPage",
                        fields: "about_us,contacts,socials,our_team"
                    }
                });

                const data = response.data;
                if (!data || !data.items || data.items.length === 0) {
                    console.error("No contacts page data received");
                    // Update request status indicating an error
                    this.getContactsPageInfoRequest = {
                        status: 'rejected',
                        code: null,
                        error: "No contacts page data received",
                        errorMSG: "No contacts page data received",
                    };
                    return;
                }

                const contactsPageInfo = data.items[0];
                this.aboutUs = contactsPageInfo.about_us;
                this.contacts = contactsPageInfo.contacts;
                this.socials = contactsPageInfo.socials;

                const picturesIds = contactsPageInfo.our_team.map(item => item.value.picture);
                const picturesResponses = await Promise.all(picturesIds.map(id => axios.get(`/api/v2/cms/images/${id}/`)));
                const pictures = picturesResponses.map(item => item.data.meta.download_url);

                for (let i = 0, l = pictures.length; i < l; i++) {
                    this.teamMembers.push({
                        name: contactsPageInfo.our_team[i].value.name,
                        role: contactsPageInfo.our_team[i].value.role,
                        contacts: contactsPageInfo.our_team[i].value.contacts,
                        picture: pictures[i]
                    });
                }

                // Update request status after successful response
                this.getContactsPageInfoRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {
                const errorStore = useErrorStore();

                errorStore.addError({text: "Error has occurred while fetching contacts page data"})

                // Update request status and error details if request fails
                this.getContactsPageInfoRequest = {
                    status: 'rejected',
                    code: error.response?.status || null,
                    error: error,
                    errorMSG: error.message,
                };
            }
        }
    }
})
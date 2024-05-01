import {defineStore} from "pinia";

import {getContactsPageInfo} from "@/store/resolvers/getContactsPageInfo.js";

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
        getContactsPageInfo
    }
})
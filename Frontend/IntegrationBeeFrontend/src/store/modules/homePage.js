
import {defineStore} from 'pinia'

import {fetchHomePageInfo} from "@/store/resolvers/fetchHomePageInfo.js";





export const useHomePageStore = defineStore('homePage', {
    state: ()=>({
        isFetched: false,
        titleSectionHeaderText: null,
        titleSectionDescriptionText: null,
        aboutDescription: null,
        aboutDemoVideoLink: null,
        bulletPointsHeaderText: null,
        bulletPoints: [],
        picture: null,
        mainSponsorPicture: null,
        mainSponsorDescription: null,
        sponsors: [],
        acknowledgements: [],
        fetchHomePageInfo:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        }

    }),
    getters:{
    },
    actions: {
        fetchHomePageInfo
    }
})
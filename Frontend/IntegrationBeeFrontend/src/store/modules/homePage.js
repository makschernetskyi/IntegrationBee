import axios from 'axios'
import {defineStore} from 'pinia'

import {useErrorStore} from "@/store/modules/error.js";


const HOME_PAGE_INFO_URL = "/api/v2/cms/pages/?type=home.HomePage&fields=title,title_section_header,title_section_description,bullet_points_section_header,bullet_points,homepage_picture,sponsors,acknowledgements"


export const useHomePageStore = defineStore('homePage', {
    state: ()=>({
        isFetched: false,
        titleSectionHeaderText: null,
        titleSectionDescriptionText: null,
        bulletPointsHeaderText: null,
        bulletPoints: [],
        picture: null,
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
        async fetchHomePageInfo() {
            try {
                const response = await axios.get(HOME_PAGE_INFO_URL);
                const data = response.data;

                if (!data || !data.items || !data.items["0"]) {
                    throw new Error("Invalid response format: missing or invalid data");
                }

                const pageInfo = data.items["0"];

                if (!pageInfo.title_section_header || !pageInfo.title_section_description || !pageInfo.bullet_points_section_header || !pageInfo.bullet_points) {
                    throw new Error("Invalid response format: missing required fields");
                }

                // Clear existing bullet points
                this.bulletPoints = [];

                // Populate bullet points
                pageInfo.bullet_points.forEach(point => {
                    if (point.value && point.value.header && point.value.text) {
                        this.bulletPoints.push({ header: point.value.header, text: point.value.text });
                    }
                });

                // Clear existing acknowledgements
                this.acknowledgements = [];

                // Populate acknowledgements
                pageInfo.acknowledgements.forEach(point => {
                    if (point.value && point.value.name) {
                        this.acknowledgements.push({ name: point.value.name });
                    }
                });

                //fetching sponsors pictures
                //todo more error handling here

                const sponsorsPicturesIds = pageInfo.sponsors.map(item => item.value.sponsor_picture);
                const picturesResponses = await Promise.all(sponsorsPicturesIds.map(id => axios.get(`/api/v2/cms/images/${id}/`)));
                const sponsorsPictures = picturesResponses.map(item => item.data.meta.download_url);

                this.sponsors = sponsorsPictures.map(picture=>({picture}))


                // Update state
                this.titleSectionHeaderText = pageInfo.title_section_header;
                this.titleSectionDescriptionText = pageInfo.title_section_description;
                this.bulletPointsHeaderText = pageInfo.bullet_points_section_header;
                this.picture = pageInfo.homepage_picture?.meta.download_url
                this.isFetched = true;

                this.fetchHomePageInfo.error = null;
                this.fetchHomePageInfo.errorMSG = null;
            } catch (error) {

                const errorStore = useErrorStore()
                errorStore.addError({text: "Error has occurred while fetching home page. Try again later."})

                this.fetchHomePageInfo.status = 'rejected';
                this.fetchHomePageInfo.code = null;
                this.fetchHomePageInfo.error = error;
                this.fetchHomePageInfo.errorMSG = error.message;
            }
        }
    }
})
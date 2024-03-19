
import {defineStore} from 'pinia'


const HOME_PAGE_INFO_URL = "/api/v2/cms/pages/?type=home.HomePage&fields=title,title_section_header,title_section_description,bullet_points_section_header,bullet_points,homepage_picture"


export const useHomePageStore = defineStore('homePage', {
    state: ()=>({
        isFetched: false,
        titleSectionHeaderText: null,
        titleSectionDescriptionText: null,
        bulletPointsHeaderText: null,
        bulletPoints: [],
        picture: null,
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


                // Update state
                this.titleSectionHeaderText = pageInfo.title_section_header;
                this.titleSectionDescriptionText = pageInfo.title_section_description;
                this.bulletPointsHeaderText = pageInfo.bullet_points_section_header;
                this.picture = pageInfo.homepage_picture?.meta.download_url
                this.isFetched = true;

                this.fetchHomePageInfo.error = null;
                this.fetchHomePageInfo.errorMSG = null;
            } catch (error) {
                this.fetchHomePageInfo.status = 'rejected';
                this.fetchHomePageInfo.code = null;
                this.fetchHomePageInfo.error = error;
                this.fetchHomePageInfo.errorMSG = error.message;
            }
        }
    }
})
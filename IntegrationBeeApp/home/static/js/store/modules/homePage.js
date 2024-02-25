
const {defineStore} = Pinia;


const HOME_PAGE_INFO_URL = "/api/v2/pages/?type=home.HomePage&fields=title,title_section_header,title_section_description,bullet_points_section_header,bullet_points"


export const useHomePageStore = defineStore('homePage', {
    state: ()=>({
        titleSectionHeaderText: null,
        titleSectionDescriptionText: null,
        bulletPointsHeaderText: null,
        bulletPoints: []

    }),
    getters:{
    },
    actions: {
        async fetchHomePageInfo(){
            try{
                const response = await axios.get(HOME_PAGE_INFO_URL)
                const data = response.data
                // if(!data || !data.items){
                //     console.error("no homepage data received")
                //     return
                // }
                const pageInfo = data.items["0"]
                this.titleSectionHeaderText = pageInfo.title_section_header
                this.titleSectionDescriptionText = pageInfo.title_section_description
                this.bulletPointsHeaderText = pageInfo.bullet_points_section_header
                pageInfo.bullet_points.forEach(point => {this.bulletPoints.push({header: point.value.header, text: point.value.text})})

            }catch(e){
                console.error(e)
            }

        }
    }
})
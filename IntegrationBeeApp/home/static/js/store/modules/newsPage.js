
const {defineStore} = Pinia;


const PAGES_URL = "/api/v2/cms/pages/"


export const useNewsPageStore = defineStore('newsPage', {
    state: ()=>({
        headerText: null,
        news:[],
    }),
    getters:{
    },
    actions: {
        async fetchNewsPageInfo(){
            try{
                const response = await axios.get(PAGES_URL,{
                    params:{
                        type: "home.NewsPage",
                        fields: "page_title"
                    }
                })
                const data = response.data
                // if(!data || !data.items){
                //     console.error("no homepage data received")
                //     return
                // }
                const pageInfo = data.items["0"]
                this.headerText = pageInfo.page_title

            }catch(e){
                console.error(e)
            }
        },
        async fetchNewsInfo(page, itemsPerPage=10){
            try{
                const response = await axios.get(PAGES_URL,{
                    params: {
                        type: "home.NewsPost",
                        fields: "header,text,picture",
                        limit: itemsPerPage,
                        offset: itemsPerPage*(page-1)
                    }
                })
                const data = response.data
                // if(!data || !data.items){
                //     console.error("no homepage data received")
                //     return
                // }
                const newsItems = data.items
                newsItems.forEach(item=>{
                    this.news.push({
                        header: item.header,
                        content: item.text,
                        pictureUrl: item.picture?.download_url
                    })
                })

            }catch(e){
                console.error(e)
            }

        }
    }
})
import NewsItem from "./NewsItem.js"
import {useStore} from "../../store/index.js";

const {onMounted, onBeforeUnmount} = Vue

const ITEMS_PER_PAGE = 10;

export default {
    components:{
        NewsItem
    },
    setup(){
        //console.log(this.$route)
        const store = useStore().newsPage

        const searchParams = new URLSearchParams(window.location.hash.split('/').pop());
        let pageNumber = 1
        console.log(searchParams.get("page"))
        if(searchParams.has("page")){
            pageNumber = searchParams.get("page")
        }


        onMounted(async ()=>{
            await Promise.all([store.fetchNewsPageInfo(), store.fetchNewsInfo(pageNumber,ITEMS_PER_PAGE)])
        })

        onBeforeUnmount(()=>{
            store.$reset()
        })


        return {
            content: store.$state
        }
    },
    template: `
        <div class="NewsPage">
            <h1 class="NewsPage-header">{{content.headerText}}</h1>
            <div class="NewsPage-Feed">
                <NewsItem v-for="news in content.news" :content="news.content" :header="news.header"/>
            </div>
        </div>
    `
}
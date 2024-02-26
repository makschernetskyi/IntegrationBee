import NewsItem from "./NewsItem.js"
import {useStore} from "../../store/index.js";

const {onMounted} = Vue

const ITEMS_PER_PAGE = 10;

export default {
    components:{
        NewsItem
    },
    setup(){

        const store = useStore().newsPage

        const myNews = [
            {
                header:"Integration Bee UniWien edition is coming!",
                content: `Hi! We orginize <b>IntegrationBee competition in <i>Vienna</i></b>🥳! 
                          Participate, find new friends and win prizes! How? Stay tuned 📻 for new
                          Information! `
            },
        ]

        onMounted(async ()=>{
            await Promise.all([store.fetchNewsPageInfo(), store.fetchNewsInfo(1,ITEMS_PER_PAGE)])
        })

        return {
            myNews,
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
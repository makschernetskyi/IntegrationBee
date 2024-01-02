import NewsItem from "./NewsItem.js"

export default {
    components:{
        NewsItem
    },
    setup(){
        const myNews = [
            {
                header:"Integration Bee UniWien edition is coming!",
                content: `Hi! We orginize <b>IntegrationBee competition in <i>Vienna</i></b>🥳! 
                          Participate, find new friends and win prizes! How? Stay tuned 📻 for new
                          Information! `
            },
        ]
        return {myNews}
    },
    template: `
        <div class="NewsPage">
            <h1 class="NewsPage-header">Our News:</h1>
            <div class="NewsPage-Feed">
                <NewsItem v-for="news in myNews" :content="news.content" :header="news.header"/>
            </div>
        </div>
    `
}
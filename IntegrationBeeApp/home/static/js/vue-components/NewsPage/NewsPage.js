import NewsItem from "./NewsItem.js"

export default {
    components:{
        NewsItem
    },
    setup(){
        const myNews = [
            {header:"my News", content: "I ate too much"},
            {header:"Alina's News", content: "She passed her exam"},
            {header:"Breaking News", content: "new year has come!!!"},
            {header:"my News", content: "I ate too much"},
            {header:"Alina's News", content: "She passed her exam"},
            {header:"Breaking News", content: "new year has come!!!"},
            {header:"my News", content: "I ate too much"},
            {header:"Alina's News", content: "She passed her exam"},
            {header:"Breaking News", content: "new year has come!!!"},
        ]
        return {myNews}
    },
    template: `
        <div class="NewsPage">
            <div class="NewsPage-Feed">
                <NewsItem v-for="news in myNews" :content="news.content" :header="news.header"/>
            </div>
        </div>
    `
}
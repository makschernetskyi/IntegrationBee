import CompetitionsItem from "./CompetitionsItem.js"

export default {
    components:{
        CompetitionsItem
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
        <div class="CompetitionsPage">
            <section class="CompetitionsPage-Competitions CompetitionsPage-Competitions--upcoming">
                <h1 class="CompetitionsPage-Competitions-header">Upcoming Competitions:</h1>
                <div class="CompetitionsPage-Competitions-Feed">
                    <CompetitionsItem v-for="news in myNews" :content="news.content" :header="news.header"/>
                </div>
            </section>
            <section class="CompetitionsPage-Competitions CompetitionsPage-Competitions--past">
                <h1 class="CompetitionsPage-Competitions-header">Past Competitions:</h1>
                <div class="CompetitionsPage-Competitions-Feed">
                    <CompetitionsItem v-for="news in myNews" :content="news.content" :header="news.header"/>
                </div>
            </section>
            
        </div>
    `
}
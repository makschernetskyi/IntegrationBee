import CompetitionsItem from "./CompetitionsItem.js"

export default {
    components:{
        CompetitionsItem
    },
    setup(){
        const upcomingCompetitions = [
            {
                title: "Integration Bee UniWien Summer 2024",
                description: `First Integration Bee in UniWien, that will happen in Summer 2024!`,
                date: "15.06.2024 18:00 CET",
                location: "https://osm.org/go/0JrJGoMpX-?m=&node=2431089983",
                locationName: "Oskar Morgenstern Platz 1",
                id: 1
            },
        ]
        const pastCompetitions = [
            {
                title: "Integration Bee UniWien Summer 2023",
                description: `Example Past Competition`,
                date: "15.06.2023 18:00 CET",
                location: "https://osm.org/go/0JrJGoMpX-?m=&node=2431089983",
                locationName: "Oskar Morgenstern Platz 1",
                id: 2
            },
        ]
        return {upcomingCompetitions, pastCompetitions}
    },
    template: `
        <div class="CompetitionsPage">
            <section class="CompetitionsPage-Competitions CompetitionsPage-Competitions--upcoming">
                <h1 class="CompetitionsPage-Competitions-header">Upcoming Competitions:</h1>
                <div class="CompetitionsPage-Competitions-Feed">
                    <CompetitionsItem v-for="competition in upcomingCompetitions" :title="competition.title" :description="competition.description" :date="competition.date" :location="competition.location" :locationName="competition.locationName"  :id="competition.id"/>
                </div>
            </section>
            <section class="CompetitionsPage-Competitions CompetitionsPage-Competitions--past">
                <h1 class="CompetitionsPage-Competitions-header">Past Competitions:</h1>
                <div class="CompetitionsPage-Competitions-Feed">
                    <CompetitionsItem v-for="competition in pastCompetitions" :title="competition.title" :description="competition.description" :date="competition.date" :location="competition.location" :locationName="competition.locationName"  :id="competition.id"/>
                </div>
            </section>
            
        </div>
    `
}
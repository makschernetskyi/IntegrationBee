
export default {
    props: ["title","description", "date", "location", "locationName", "id", "icon"],
    setup(props){
        const {title, description, date, location, id, icon, locationName} = props
        const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"
        return {title, description, date, location, id, icon, locationName, placeholderImage}
    },
    template: `
        <router-link :to="'/competition/' + id" class="CompetitionsPage-Competitions-Feed-Item">
            <h2 class="CompetitionsPage-Competitions-Feed-Item-header">{{title}}</h2>
            <div class="CompetitionsPage-Competitions-Feed-Item-Icon">
                <img :src="icon ? icon : placeholderImage" alt="competition icon"/>
            </div>
            <div class="CompetitionsPage-Competitions-Feed-Item-About">
                <div class="CompetitionsPage-Competitions-Feed-Item-About-Location">
                    <p class="CompetitionsPage-Competitions-Feed-Item-About-Location-date">
                        {{date}}
                    </p>
                    <p class="CompetitionsPage-Competitions-Feed-Item-About-Location-place">
                        {{locationName}}
                    </p>
                </div>
                <p class="CompetitionsPage-Competitions-Feed-Item-About-description" v-html="description">
                </p>
            </div>
        </router-link>
    `
}
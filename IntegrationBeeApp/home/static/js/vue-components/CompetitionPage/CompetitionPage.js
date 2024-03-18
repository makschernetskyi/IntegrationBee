import {useStore} from "../../store/index.js";
import {formatDateToString} from "../../utils/formatDateToString.js";

const  {useRouter} = VueRouter
const {onMounted, computed} = Vue



export default {
    setup(){

        const competitionsStore = useStore().competitionsPage;
        const router = useRouter();
        const competitionId = router.currentRoute._value.params.id

        onMounted(()=>{
            competitionsStore.fetchCompetitionInfo(competitionId)
        })

        const competitionInfo = computed({get: ()=>competitionsStore.currentCompetition})



        return {
            competitionId,
            competition: competitionInfo,
            formatDateToString
        }

    },
    template: `
        <div class="Competition">
            <div class="Competition-MetaInfo">
                <div class="Competition-MetaInfo-Picture">
                    <img :src="competition.pictureUrl" alt=""/>
                </div>
                <p class="Competition-MetaInfo-time">Date: {{competition.date ? formatDateToString(competition.date) : null}}</p>
                <p class="Competition-MetaInfo-Location">
                    Place: 
                    <template v-if="!competition.locationUrl">{{competition.location}}</template>
                    <a v-if="competition.locationUrl" :href="competition.locationUrl" target="_blank">{{competition.location}}</a>
                </p>
            </div>
            <div class="Competition-Description">
                <h2 class="Competition-Description-header">{{competition.header}}</h2>
                <p class="Competition-Description-description" v-html="competition.description"></p>
            </div>
        </div>
    `
}
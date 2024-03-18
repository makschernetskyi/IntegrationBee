
import {useStore} from "../../store/index.js"

const {useRouter} = VueRouter
const {onBeforeMount, computed} = Vue

const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"


export default {
    setup(){
        const authStore = useStore().auth;
        const competitionsStore = useStore().competitionsPage;
        const adminStore = useStore().admin


        onBeforeMount(()=>{
            competitionsStore.fetchAllDBCompetitions()
        })

        const userInfo = computed({get: ()=>authStore.user})
        const allCompetitions = computed({get: ()=>competitionsStore.competitionsDB})

        const addNewCompetitionNameInput = computed({get: ()=>adminStore.addNewCompetitionForm.name, set: adminStore.setAddNewCompetitionFormNameValue})
        const addNewCompetitionMaxParticipantsInput = computed({get: ()=>adminStore.addNewCompetitionForm.maxParticipants, set: adminStore.setAddNewCompetitionFormMaxParticipantsValue})

        const handleAddNewCompetitionSubmit = async(event)=>{
            event.preventDefault()
            await competitionsStore.addCompetition(adminStore.addNewCompetitionForm.name, adminStore.addNewCompetitionForm.maxParticipants)
            await competitionsStore.fetchAllDBCompetitions()

            adminStore.setAddNewCompetitionFormNameValue('')
            adminStore.setAddNewCompetitionFormMaxParticipantsValue('0')
        }

        return {
            user: userInfo,
            allCompetitions,
            addNewCompetitionNameInput,
            addNewCompetitionMaxParticipantsInput,
            handleAddNewCompetitionSubmit
        }
    },
    template: `
        <div class="Admin">
            <h1>Admin page</h1>
            <h2>Hello, {{user.firstName}}</h2>
            
            <div class="Admin-Competitions">
                <form @submit="handleAddNewCompetitionSubmit">
                    add new competition:
                    <input type="text" placeholder="competition_name" v-model="addNewCompetitionNameInput">
                    <input type="text" placeholder="max participants" v-model="addNewCompetitionMaxParticipantsInput">
                    <button type="submit">+</button>
                </form>
                <div class="Admin-Competitions-AllCompetitions">
                    <ul class="Admin-Competitions-AllCompetitions-List">
                        <li v-for="competition in allCompetitions" class="Admin-Competitions-AllCompetitions-item">id: {{competition.id}} name: {{competition.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
    `
}
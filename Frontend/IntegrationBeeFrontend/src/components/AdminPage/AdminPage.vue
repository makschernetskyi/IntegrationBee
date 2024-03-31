<script setup>
    import {useStore} from "../../store/index.js"

    //import {useRouter} from 'vue-router'
    import {onBeforeMount, computed} from 'vue'

    const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"



    const authStore = useStore().auth;
    const competitionsStore = useStore().competitionsPage;
    const adminStore = useStore().admin


    onBeforeMount(()=>{
        Promise.all([competitionsStore.fetchAllDBCompetitions(), adminStore.fetchAllUsers()])
    })

    const userInfo = computed({get: ()=>authStore.user})
    const allCompetitions = computed({get: ()=>competitionsStore.competitionsDB})
    const visibleUsers = computed(()=>adminStore.visibleUsers)
    const filters = computed(()=>adminStore.filters)

    const addNewCompetitionNameInput = computed({get: ()=>adminStore.addNewCompetitionForm.name, set: adminStore.setAddNewCompetitionFormNameValue})
    const addNewCompetitionMaxParticipantsInput = computed({get: ()=>adminStore.addNewCompetitionForm.maxParticipants, set: adminStore.setAddNewCompetitionFormMaxParticipantsValue})

    const handleAddNewCompetitionSubmit = async(event)=>{
        event.preventDefault()
        await competitionsStore.addCompetition(adminStore.addNewCompetitionForm.name, adminStore.addNewCompetitionForm.maxParticipants)
        await competitionsStore.fetchAllDBCompetitions()

        adminStore.setAddNewCompetitionFormNameValue('')
        adminStore.setAddNewCompetitionFormMaxParticipantsValue('0')
    }

    const handleRemoveCompetition = async(event, id)=>{
        event.preventDefault()
        await competitionsStore.removeCompetition(Number(id))
        await competitionsStore.fetchAllDBCompetitions()
    }

    const user = userInfo;
</script>
<template>
        <div class="Admin">
            <h1 class="Admin-Header">Admin page</h1>
            <h2 class="Admin-Greeting">Hello, {{user.firstName}}</h2>
            
            <div class="Admin-Competitions">
                <form @submit="handleAddNewCompetitionSubmit" class="Admin-Competition-Form">
                    <h3>add new competition:</h3>
                    <input type="text" placeholder="competition_name" v-model="addNewCompetitionNameInput">
                    <label for="adminMaxParticipants">competitors:</label>
                    <input type="text" placeholder="max participants" id="adminMaxParticipants" v-model="addNewCompetitionMaxParticipantsInput">
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    </button>
                </form>
                <div class="Admin-Competitions-AllCompetitions">
                    <ul class="Admin-Competitions-AllCompetitions-List">
                        <li v-for="competition in allCompetitions" class="Admin-Competitions-AllCompetitions-List-Item">
                            <button class="Admin-Competitions-AllCompetitions-List-Item-Selector" @click="()=>{adminStore.addFilter(Number(competition.id))}">
                                <span class="Admin-Competitions-AllCompetitions-List-Item-Selector-id">id: {{competition.id}}</span>
                                <span class="Admin-Competitions-AllCompetitions-List-Item-Selector-name">name: {{competition.name}}</span>
                                <span class="Admin-Competitions-AllCompetitions-List-Item-Selector-competitors">competitors: {{competition.participants.length}} <template v-if="Object.hasOwn(competition, 'max_participants')">/{{competition.max_participants}}</template></span>
                            </button>
                            <button class="Admin-Competitions-AllCompetitions-List-Item-deleteBtn" @click="(event)=>{handleRemoveCompetition(event,competition.id)}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <h2 class="Admin-Greeting">Users</h2>

            <div class="Admin-Users">
                <div class="Admin-Users-Search">
                    <input type="text" class="Admin-users-Search-Searchbar" v-model="adminStore.searchbar" placeholder="Search...">
                </div>
                <div class="Admin-Competitions-Filters">
                    filters:
                    <span v-for="filter in filters" class="Admin-Competitions-AllUsers-Filters-Filter">
                        <p class="Admin-Competitions-AllUsers-Filters-Filter-name">
                            competition #{{ filter }}
                        </p>
                        <button class="Admin-Competitions-AllUsers-Filters-Filter-removeBtn" @click="()=>{adminStore.removeFilter(filter)}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                        </button>
                    </span>
                </div>
                <div class="Admin-Competitions-AllUsers">
                    <ul class="Admin-Competitions-AllUsers-List">
                        <li v-for="user in visibleUsers" class="Admin-Competitions-AllUsers-Item">
                            <p class="Admin-Competitions-AllUsers-Item-info">name: {{user.first_name + ' ' + user.second_name}}</p>
                            <p class="Admin-Competitions-AllUsers-Item-info">school: {{user.school}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
</template>
<script setup>
    import {useStore} from "@/store/index.js";
    import {formatDateToString} from "@/utils/formatDateToString.js";

    import  {useRouter} from 'vue-router';
    import {onMounted, computed, onBeforeUnmount} from 'vue'

    const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"



    const competitionsStore = useStore().competitionsPage;
    const authStore = useStore().auth;
    const router = useRouter();
    const competitionId = router.currentRoute._value.params.id

    onMounted(()=>{
        competitionsStore.fetchCompetitionInfo(competitionId)
    })

    onBeforeUnmount(()=>{
        competitionsStore.$reset()
    })

    const competitionInfo = computed({get: ()=>competitionsStore.currentCompetition})
    const requestInfo = computed(()=>competitionsStore.fetchCompetitionInfoRequest)
    const userInfo = computed({get: ()=>authStore.user})

    async function joinCompetition(id){
        await competitionsStore.signUpForCompetition(id)
        await authStore.getUserData()
        competitionsStore.$reset()
        await competitionsStore.fetchCompetitionInfo(competitionId)
    }

    async function leaveCompetition(id){
        await competitionsStore.deregisterFromCompetition(id)
        await authStore.getUserData()
        competitionsStore.$reset()
        await competitionsStore.fetchCompetitionInfo(competitionId)
    }

    const [user, competition] = [userInfo, competitionInfo];
    const isAuthenticated = computed(()=>authStore.isAuthenticated)

</script>
<template>
    <div class="Competition">
        <div class="Competition-MetaInfo">
            <div class="Competition-MetaInfo-Picture">
                <img :src="competition.pictureUrl ? competition.pictureUrl : placeholderImage" alt=""/>
            </div>
            <p class="Competition-MetaInfo-time">Date: {{competition.date ? formatDateToString(competition.date) : null}}</p>
            <p class="Competition-MetaInfo-Location">
                Place:
                <template v-if="!competition.locationUrl">{{competition.location}}</template>
                <a v-if="competition.locationUrl" :href="competition.locationUrl" target="_blank">{{competition.location}}</a>
            </p>
            <template v-if="!competitionInfo.maxParticipants || Number(competitionInfo.participants) < Number(competitionInfo.maxParticipants)">
                <p v-if="isAuthenticated && competition.relatedCompetitionId && user.competitions.map(c=>c.id).includes(competition.relatedCompetitionId)" class="Competition-MetaInfo-goingMessage">You are going.</p>
                <button v-if="isAuthenticated && competition.relatedCompetitionId && !user.competitions.map(c=>c.id).includes(competition.relatedCompetitionId)" class="Competition-MetaInfo-JoinBtn" @click="()=>joinCompetition(competition.relatedCompetitionId)">Join!</button>
                <button v-if="isAuthenticated && competition.relatedCompetitionId && user.competitions.map(c=>c.id).includes(competition.relatedCompetitionId)" class="Competition-MetaInfo-LeaveBtn" @click="()=>leaveCompetition(competition.relatedCompetitionId)">Quit</button>
                <p v-if="!isAuthenticated" class="Competition-MetaInfo-notAuthenticatedMessage">in order to participate sign in first.</p>
                <router-link to="/signIn" v-if="!isAuthenticated" class="Competition-MetaInfo-signInLink">Sign in</router-link>
            </template>
            <template v-if="(competitionInfo.maxParticipants && Number(competitionInfo.participants) >= Number(competitionInfo.maxParticipants)) || (competitionInfo.relatedCompetitionId === null && requestInfo.status && requestInfo.status!== 'pending')">
                <p class="Competition-MetaInfo-info">registration is closed</p>
            </template>
            <p v-if="competitionInfo.participants !== null" class="Competition-MetaInfo-info">participants: {{competitionInfo.participants}}<template v-if="competitionInfo.maxParticipants !== null">/{{competitionInfo.maxParticipants}}</template></p>
        </div>
        <div class="Competition-Description">
            <h2 class="Competition-Description-header">{{competition.header}}</h2>
            <p class="Competition-Description-description" v-html="'About: ' + competition.description"></p>
        </div>
    </div>
</template>